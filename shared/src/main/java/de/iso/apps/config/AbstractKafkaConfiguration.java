package de.iso.apps.config;

import de.iso.apps.contracts.ChangedEventArgs;
import de.iso.apps.contracts.ExternalObservailable;
import de.iso.apps.contracts.ExternalObserver;
import de.iso.apps.contracts.GenericExternalObserver;
import de.iso.apps.contracts.GenericTopicDistributor;
import de.iso.apps.contracts.TopicDistributor;
import lombok.var;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.HashMap;
import java.util.Map;

@Configuration @EnableKafka public abstract class AbstractKafkaConfiguration<E extends ChangedEventArgs> {
    private final KafkaProperties kafkaProperties;
    private static final Logger log = LoggerFactory.getLogger(AbstractKafkaConfiguration.class);
    
    public AbstractKafkaConfiguration(KafkaProperties kafkaProperties) {
        this.kafkaProperties = kafkaProperties;
    }
    
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public ExternalObserver<String, E> externalObserver() {
        return new MailChangingObserver();
    }
    
    public TopicDistributor<E> userProducer() {
        Map<String, Object> props = new HashMap<>(kafkaProperties.buildProducerProperties());
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        log.info("Producerconfig: {}", props);
        var factory = new DefaultKafkaProducerFactory<String, E>(props);
        var template = new KafkaTemplate<String, E>(factory);
        return new TopicMailDistributor(template, new NewTopic(getName(), 1, (short) 1));
    }
    
    protected abstract String getName();
    
    //
    //
    // Consumer configuration
    //
    public ConcurrentKafkaListenerContainerFactory<String, E> kafkaListenerContainerFactory() {
        Map<String, Object> props = new HashMap<>(kafkaProperties.buildConsumerProperties());
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        log.info("Consumerconfig: {}", props);
        JsonDeserializer<E> jsonDeserializer = new JsonDeserializer<>();
        jsonDeserializer.addTrustedPackages("*");
        DefaultKafkaConsumerFactory<String, E> consumerFactory = new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                jsonDeserializer);
        ConcurrentKafkaListenerContainerFactory<String, E> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        return factory;
    }
    
    protected class MailChangingObserver extends GenericExternalObserver<String, E> {
        
        
        @Override
        public void listenAsObject(ConsumerRecord<String, E> cr,
                                   @Payload
                                           E payload) {
            logEntree(cr, payload);
            for (ExternalObservailable<String, E> item : getList()) {
                try {
                    item.valueChanged(cr.key(), payload);
                } catch (Exception e) {
                    AbstractKafkaConfiguration.log.error("Error in Listener", e);
                }
            }
        }
        
        
    }
    
    private class TopicMailDistributor extends GenericTopicDistributor<E> {
        
        TopicMailDistributor(KafkaTemplate<String, E> kafkaTemplate, NewTopic newTopic) {
            super(kafkaTemplate, newTopic);
        }
        
        @Override
        protected void onSuccess(NewTopic newTopic) {
            AbstractKafkaConfiguration.log.info("Sending a kafka notification for {} succeeded",
                                                newTopic.name());
        }
        
        @Override
        protected void onError(NewTopic newTopic, Throwable ex) {
            AbstractKafkaConfiguration.log.error("Sending a kafka notification  failed for {}: {}",
                                                 newTopic,
                                                 ex.toString());
        }
        
        
    }
}

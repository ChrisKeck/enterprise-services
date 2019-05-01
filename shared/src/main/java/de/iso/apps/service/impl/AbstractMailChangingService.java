package de.iso.apps.service.impl;

import de.iso.apps.contracts.ChangedEventArgs;
import de.iso.apps.contracts.TopicDistributor;
import de.iso.apps.service.MailChangingService;
import de.iso.apps.service.mapper.ChangingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service public abstract class AbstractMailChangingService<T, E extends ChangedEventArgs>
        implements MailChangingService<T> {
    private final Logger log = LoggerFactory.getLogger(AbstractMailChangingService.class);
    private final TopicDistributor<E> topicDistributor;
    private final ChangingMapper<E, T> mailChangingMapper;
    
    
    protected AbstractMailChangingService(TopicDistributor<E> topicable,
                                          ChangingMapper<E, T> mailChangingMapper) {
        this.topicDistributor = topicable;
        this.mailChangingMapper = mailChangingMapper;
    }
    
    
    @Override
    @Async
    public void propagate(T newT, T oldT) {
        try {
            E mail = map(mailChangingMapper, newT, oldT);
            if (hasChanged(mail)) {
                send(topicDistributor, mail);
            }
            log.info("All messages send");
        } catch (Exception ex) {
            log.error("Error", ex);
        }
    }
    
    private void send(TopicDistributor<E> topicDistributor, E mail) {
        topicDistributor.send(mail);
    }
    
    protected abstract boolean hasChanged(E mail);
    
    private E map(ChangingMapper<E, T> mailChangingMapper, T newT, T oldT) {
        return mailChangingMapper.map(newT, oldT);
    }
    
    
}
    

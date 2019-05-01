package de.iso.apps.service.impl;

import de.iso.apps.contracts.ChangedEventArgs;
import de.iso.apps.contracts.ExternalObservailable;
import de.iso.apps.contracts.ExternalObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractChangedListenerService<T, E extends ChangedEventArgs>
        implements ExternalObservailable<String, E> {
    private static final Logger log = LoggerFactory.getLogger(AbstractChangedListenerService.class);
    private final T currentService;
    private final ExternalObserver<String, E> externalObserver;
    
    
    public AbstractChangedListenerService(T service,
                                          ExternalObserver<String, E> externalObserver) {
        currentService = service;
        externalObserver.add(this);
        this.externalObserver = externalObserver;
    }
    
    
    @Override
    public void valueChanged(String s, E changingEventArgs) {
        log.info("New Change registred!");
        processChangedValue(currentService, changingEventArgs);
    }
    
    protected abstract void processChangedValue(T currentService, E changingEventArgs);
    
    @Override
    public int compareTo(ExternalObservailable<String, E> externalObservailable) {
        return this.getClass().getTypeName().compareTo(externalObservailable.getClass().getTypeName());
    }
}
    

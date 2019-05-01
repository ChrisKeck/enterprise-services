package de.iso.apps.service;


public interface MailChangingService<T> {
    void propagate(T newT, T oldT);
}

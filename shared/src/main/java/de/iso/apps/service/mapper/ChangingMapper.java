package de.iso.apps.service.mapper;

import de.iso.apps.contracts.ChangedEventArgs;

public abstract class ChangingMapper<E extends ChangedEventArgs, T> {
    public abstract E map(T newT, T oldT);
}

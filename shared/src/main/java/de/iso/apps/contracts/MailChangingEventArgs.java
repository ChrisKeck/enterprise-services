package de.iso.apps.contracts;

public interface MailChangingEventArgs extends ChangedEventArgs {
    String getNewMail();
    
    String getOldMail();
}

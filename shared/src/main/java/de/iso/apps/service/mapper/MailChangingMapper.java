package de.iso.apps.service.mapper;

import de.iso.apps.contracts.Mail;
import de.iso.apps.contracts.MailChangingDTOEventArgs;
import de.iso.apps.contracts.MailChangingEventArgs;
import lombok.var;
import org.springframework.stereotype.Component;

@Component public class MailChangingMapper extends ChangingMapper<MailChangingEventArgs, Mail> {
    
    public MailChangingEventArgs toMailChangingDTO(Mail newMailUserDTO, Mail oldMailUserDTO) {
        var mailBuilder = new MailChangingDTOEventArgs();
        if (newMailUserDTO != null) {
            mailBuilder.setNewMail(newMailUserDTO.getEmail());
        }
        if (oldMailUserDTO != null) {
            mailBuilder.setOldMail(oldMailUserDTO.getEmail());
        }
        return mailBuilder;
    }
    
    
    @Override
    public MailChangingEventArgs map(Mail newT, Mail oldT) {
        return toMailChangingDTO(newT, oldT);
    }
}

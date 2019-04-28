package de.iso.apps.service.mapper;

import de.iso.apps.domain.*;
import de.iso.apps.service.dto.KollegeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Kollege} and its DTO {@link KollegeDTO}.
 */
@Mapper(componentModel = "spring", uses = {BestellungMapper.class})
public interface KollegeMapper extends EntityMapper<KollegeDTO, Kollege> {



    default Kollege fromId(Long id) {
        if (id == null) {
            return null;
        }
        Kollege kollege = new Kollege();
        kollege.setId(id);
        return kollege;
    }
}

package de.iso.apps.service.mapper;

import de.iso.apps.domain.*;
import de.iso.apps.service.dto.BestellungDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bestellung} and its DTO {@link BestellungDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BestellungMapper extends EntityMapper<BestellungDTO, Bestellung> {


    @Mapping(target = "kastens", ignore = true)
    @Mapping(target = "kolleges", ignore = true)
    Bestellung toEntity(BestellungDTO bestellungDTO);

    default Bestellung fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bestellung bestellung = new Bestellung();
        bestellung.setId(id);
        return bestellung;
    }
}

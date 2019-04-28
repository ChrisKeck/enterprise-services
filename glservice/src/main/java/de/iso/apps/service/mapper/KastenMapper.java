package de.iso.apps.service.mapper;

import de.iso.apps.domain.*;
import de.iso.apps.service.dto.KastenDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Kasten} and its DTO {@link KastenDTO}.
 */
@Mapper(componentModel = "spring", uses = {BestellungMapper.class})
public interface KastenMapper extends EntityMapper<KastenDTO, Kasten> {

    @Mapping(source = "bestellung.id", target = "bestellungId")
    @Mapping(source = "bestellung.standort", target = "bestellungStandort")
    KastenDTO toDto(Kasten kasten);

    @Mapping(source = "bestellungId", target = "bestellung")
    Kasten toEntity(KastenDTO kastenDTO);

    default Kasten fromId(Long id) {
        if (id == null) {
            return null;
        }
        Kasten kasten = new Kasten();
        kasten.setId(id);
        return kasten;
    }
}

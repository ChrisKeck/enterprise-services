package de.iso.apps.service;

import de.iso.apps.service.dto.BestellungDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link de.iso.apps.domain.Bestellung}.
 */
public interface BestellungService {

    /**
     * Save a bestellung.
     *
     * @param bestellungDTO the entity to save.
     * @return the persisted entity.
     */
    BestellungDTO save(BestellungDTO bestellungDTO);

    /**
     * Get all the bestellungs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BestellungDTO> findAll(Pageable pageable);


    /**
     * Get the "id" bestellung.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BestellungDTO> findOne(Long id);

    /**
     * Delete the "id" bestellung.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

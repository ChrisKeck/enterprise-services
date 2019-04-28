package de.iso.apps.service;

import de.iso.apps.service.dto.KastenDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link de.iso.apps.domain.Kasten}.
 */
public interface KastenService {

    /**
     * Save a kasten.
     *
     * @param kastenDTO the entity to save.
     * @return the persisted entity.
     */
    KastenDTO save(KastenDTO kastenDTO);

    /**
     * Get all the kastens.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<KastenDTO> findAll(Pageable pageable);


    /**
     * Get the "id" kasten.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<KastenDTO> findOne(Long id);

    /**
     * Delete the "id" kasten.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

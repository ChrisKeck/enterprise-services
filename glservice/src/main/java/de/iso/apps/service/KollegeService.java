package de.iso.apps.service;

import de.iso.apps.service.dto.KollegeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link de.iso.apps.domain.Kollege}.
 */
public interface KollegeService {

    /**
     * Save a kollege.
     *
     * @param kollegeDTO the entity to save.
     * @return the persisted entity.
     */
    KollegeDTO save(KollegeDTO kollegeDTO);

    /**
     * Get all the kolleges.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<KollegeDTO> findAll(Pageable pageable);

    /**
     * Get all the kolleges with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<KollegeDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" kollege.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<KollegeDTO> findOne(Long id);

    /**
     * Delete the "id" kollege.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

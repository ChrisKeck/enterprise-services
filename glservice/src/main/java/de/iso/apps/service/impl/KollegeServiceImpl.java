package de.iso.apps.service.impl;

import de.iso.apps.service.KollegeService;
import de.iso.apps.domain.Kollege;
import de.iso.apps.repository.KollegeRepository;
import de.iso.apps.service.dto.KollegeDTO;
import de.iso.apps.service.mapper.KollegeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Kollege}.
 */
@Service
@Transactional
public class KollegeServiceImpl implements KollegeService {

    private final Logger log = LoggerFactory.getLogger(KollegeServiceImpl.class);

    private final KollegeRepository kollegeRepository;

    private final KollegeMapper kollegeMapper;

    public KollegeServiceImpl(KollegeRepository kollegeRepository, KollegeMapper kollegeMapper) {
        this.kollegeRepository = kollegeRepository;
        this.kollegeMapper = kollegeMapper;
    }

    /**
     * Save a kollege.
     *
     * @param kollegeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public KollegeDTO save(KollegeDTO kollegeDTO) {
        log.debug("Request to save Kollege : {}", kollegeDTO);
        Kollege kollege = kollegeMapper.toEntity(kollegeDTO);
        kollege = kollegeRepository.save(kollege);
        return kollegeMapper.toDto(kollege);
    }

    /**
     * Get all the kolleges.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<KollegeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Kolleges");
        return kollegeRepository.findAll(pageable)
            .map(kollegeMapper::toDto);
    }

    /**
     * Get all the kolleges with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<KollegeDTO> findAllWithEagerRelationships(Pageable pageable) {
        return kollegeRepository.findAllWithEagerRelationships(pageable).map(kollegeMapper::toDto);
    }
    

    /**
     * Get one kollege by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<KollegeDTO> findOne(Long id) {
        log.debug("Request to get Kollege : {}", id);
        return kollegeRepository.findOneWithEagerRelationships(id)
            .map(kollegeMapper::toDto);
    }

    /**
     * Delete the kollege by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Kollege : {}", id);
        kollegeRepository.deleteById(id);
    }
}

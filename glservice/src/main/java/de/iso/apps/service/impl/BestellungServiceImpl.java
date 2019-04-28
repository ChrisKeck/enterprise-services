package de.iso.apps.service.impl;

import de.iso.apps.service.BestellungService;
import de.iso.apps.domain.Bestellung;
import de.iso.apps.repository.BestellungRepository;
import de.iso.apps.service.dto.BestellungDTO;
import de.iso.apps.service.mapper.BestellungMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Bestellung}.
 */
@Service
@Transactional
public class BestellungServiceImpl implements BestellungService {

    private final Logger log = LoggerFactory.getLogger(BestellungServiceImpl.class);

    private final BestellungRepository bestellungRepository;

    private final BestellungMapper bestellungMapper;

    public BestellungServiceImpl(BestellungRepository bestellungRepository, BestellungMapper bestellungMapper) {
        this.bestellungRepository = bestellungRepository;
        this.bestellungMapper = bestellungMapper;
    }

    /**
     * Save a bestellung.
     *
     * @param bestellungDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BestellungDTO save(BestellungDTO bestellungDTO) {
        log.debug("Request to save Bestellung : {}", bestellungDTO);
        Bestellung bestellung = bestellungMapper.toEntity(bestellungDTO);
        bestellung = bestellungRepository.save(bestellung);
        return bestellungMapper.toDto(bestellung);
    }

    /**
     * Get all the bestellungs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BestellungDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Bestellungs");
        return bestellungRepository.findAll(pageable)
            .map(bestellungMapper::toDto);
    }


    /**
     * Get one bestellung by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BestellungDTO> findOne(Long id) {
        log.debug("Request to get Bestellung : {}", id);
        return bestellungRepository.findById(id)
            .map(bestellungMapper::toDto);
    }

    /**
     * Delete the bestellung by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bestellung : {}", id);
        bestellungRepository.deleteById(id);
    }
}

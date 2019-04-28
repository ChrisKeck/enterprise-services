package de.iso.apps.service.impl;

import de.iso.apps.service.KastenService;
import de.iso.apps.domain.Kasten;
import de.iso.apps.repository.KastenRepository;
import de.iso.apps.service.dto.KastenDTO;
import de.iso.apps.service.mapper.KastenMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Kasten}.
 */
@Service
@Transactional
public class KastenServiceImpl implements KastenService {

    private final Logger log = LoggerFactory.getLogger(KastenServiceImpl.class);

    private final KastenRepository kastenRepository;

    private final KastenMapper kastenMapper;

    public KastenServiceImpl(KastenRepository kastenRepository, KastenMapper kastenMapper) {
        this.kastenRepository = kastenRepository;
        this.kastenMapper = kastenMapper;
    }

    /**
     * Save a kasten.
     *
     * @param kastenDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public KastenDTO save(KastenDTO kastenDTO) {
        log.debug("Request to save Kasten : {}", kastenDTO);
        Kasten kasten = kastenMapper.toEntity(kastenDTO);
        kasten = kastenRepository.save(kasten);
        return kastenMapper.toDto(kasten);
    }

    /**
     * Get all the kastens.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<KastenDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Kastens");
        return kastenRepository.findAll(pageable)
            .map(kastenMapper::toDto);
    }


    /**
     * Get one kasten by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<KastenDTO> findOne(Long id) {
        log.debug("Request to get Kasten : {}", id);
        return kastenRepository.findById(id)
            .map(kastenMapper::toDto);
    }

    /**
     * Delete the kasten by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Kasten : {}", id);
        kastenRepository.deleteById(id);
    }
}

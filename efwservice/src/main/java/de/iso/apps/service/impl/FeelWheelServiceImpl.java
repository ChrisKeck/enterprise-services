package de.iso.apps.service.impl;

import de.iso.apps.service.FeelWheelService;
import de.iso.apps.domain.FeelWheel;
import de.iso.apps.repository.FeelWheelRepository;
import de.iso.apps.service.dto.FeelWheelDTO;
import de.iso.apps.service.mapper.FeelWheelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link FeelWheel}.
 */
@Service
@Transactional
public class FeelWheelServiceImpl implements FeelWheelService {

    private final Logger log = LoggerFactory.getLogger(FeelWheelServiceImpl.class);

    private final FeelWheelRepository feelWheelRepository;

    private final FeelWheelMapper feelWheelMapper;

    public FeelWheelServiceImpl(FeelWheelRepository feelWheelRepository, FeelWheelMapper feelWheelMapper) {
        this.feelWheelRepository = feelWheelRepository;
        this.feelWheelMapper = feelWheelMapper;
    }

    /**
     * Save a feelWheel.
     *
     * @param feelWheelDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public FeelWheelDTO save(FeelWheelDTO feelWheelDTO) {
        log.debug("Request to save FeelWheel : {}", feelWheelDTO);
        FeelWheel feelWheel = feelWheelMapper.toEntity(feelWheelDTO);
        feelWheel = feelWheelRepository.save(feelWheel);
        return feelWheelMapper.toDto(feelWheel);
    }

    /**
     * Get all the feelWheels.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FeelWheelDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FeelWheels");
        return feelWheelRepository.findAll(pageable)
            .map(feelWheelMapper::toDto);
    }


    /**
     * Get one feelWheel by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FeelWheelDTO> findOne(Long id) {
        log.debug("Request to get FeelWheel : {}", id);
        return feelWheelRepository.findById(id)
            .map(feelWheelMapper::toDto);
    }

    /**
     * Delete the feelWheel by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FeelWheel : {}", id);
        feelWheelRepository.deleteById(id);
    }
}

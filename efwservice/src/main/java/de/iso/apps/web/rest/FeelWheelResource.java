package de.iso.apps.web.rest;

import de.iso.apps.service.FeelWheelService;
import de.iso.apps.web.rest.errors.BadRequestAlertException;
import de.iso.apps.service.dto.FeelWheelDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.iso.apps.domain.FeelWheel}.
 */
@RestController
@RequestMapping("/api")
public class FeelWheelResource {

    private final Logger log = LoggerFactory.getLogger(FeelWheelResource.class);

    private static final String ENTITY_NAME = "efwserviceFeelWheel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FeelWheelService feelWheelService;

    public FeelWheelResource(FeelWheelService feelWheelService) {
        this.feelWheelService = feelWheelService;
    }

    /**
     * {@code POST  /feel-wheels} : Create a new feelWheel.
     *
     * @param feelWheelDTO the feelWheelDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new feelWheelDTO, or with status {@code 400 (Bad Request)} if the feelWheel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/feel-wheels")
    public ResponseEntity<FeelWheelDTO> createFeelWheel(@Valid @RequestBody FeelWheelDTO feelWheelDTO) throws URISyntaxException {
        log.debug("REST request to save FeelWheel : {}", feelWheelDTO);
        if (feelWheelDTO.getId() != null) {
            throw new BadRequestAlertException("A new feelWheel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FeelWheelDTO result = feelWheelService.save(feelWheelDTO);
        return ResponseEntity.created(new URI("/api/feel-wheels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /feel-wheels} : Updates an existing feelWheel.
     *
     * @param feelWheelDTO the feelWheelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feelWheelDTO,
     * or with status {@code 400 (Bad Request)} if the feelWheelDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the feelWheelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/feel-wheels")
    public ResponseEntity<FeelWheelDTO> updateFeelWheel(@Valid @RequestBody FeelWheelDTO feelWheelDTO) throws URISyntaxException {
        log.debug("REST request to update FeelWheel : {}", feelWheelDTO);
        if (feelWheelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FeelWheelDTO result = feelWheelService.save(feelWheelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, feelWheelDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /feel-wheels} : get all the feelWheels.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of feelWheels in body.
     */
    @GetMapping("/feel-wheels")
    public ResponseEntity<List<FeelWheelDTO>> getAllFeelWheels(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of FeelWheels");
        Page<FeelWheelDTO> page = feelWheelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /feel-wheels/:id} : get the "id" feelWheel.
     *
     * @param id the id of the feelWheelDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the feelWheelDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/feel-wheels/{id}")
    public ResponseEntity<FeelWheelDTO> getFeelWheel(@PathVariable Long id) {
        log.debug("REST request to get FeelWheel : {}", id);
        Optional<FeelWheelDTO> feelWheelDTO = feelWheelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(feelWheelDTO);
    }

    /**
     * {@code DELETE  /feel-wheels/:id} : delete the "id" feelWheel.
     *
     * @param id the id of the feelWheelDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/feel-wheels/{id}")
    public ResponseEntity<Void> deleteFeelWheel(@PathVariable Long id) {
        log.debug("REST request to delete FeelWheel : {}", id);
        feelWheelService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

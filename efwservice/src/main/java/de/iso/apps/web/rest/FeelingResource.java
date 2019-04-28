package de.iso.apps.web.rest;

import de.iso.apps.service.FeelingService;
import de.iso.apps.web.rest.errors.BadRequestAlertException;
import de.iso.apps.service.dto.FeelingDTO;

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
 * REST controller for managing {@link de.iso.apps.domain.Feeling}.
 */
@RestController
@RequestMapping("/api")
public class FeelingResource {

    private final Logger log = LoggerFactory.getLogger(FeelingResource.class);

    private static final String ENTITY_NAME = "efwserviceFeeling";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FeelingService feelingService;

    public FeelingResource(FeelingService feelingService) {
        this.feelingService = feelingService;
    }

    /**
     * {@code POST  /feelings} : Create a new feeling.
     *
     * @param feelingDTO the feelingDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new feelingDTO, or with status {@code 400 (Bad Request)} if the feeling has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/feelings")
    public ResponseEntity<FeelingDTO> createFeeling(@Valid @RequestBody FeelingDTO feelingDTO) throws URISyntaxException {
        log.debug("REST request to save Feeling : {}", feelingDTO);
        if (feelingDTO.getId() != null) {
            throw new BadRequestAlertException("A new feeling cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FeelingDTO result = feelingService.save(feelingDTO);
        return ResponseEntity.created(new URI("/api/feelings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /feelings} : Updates an existing feeling.
     *
     * @param feelingDTO the feelingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feelingDTO,
     * or with status {@code 400 (Bad Request)} if the feelingDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the feelingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/feelings")
    public ResponseEntity<FeelingDTO> updateFeeling(@Valid @RequestBody FeelingDTO feelingDTO) throws URISyntaxException {
        log.debug("REST request to update Feeling : {}", feelingDTO);
        if (feelingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FeelingDTO result = feelingService.save(feelingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, feelingDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /feelings} : get all the feelings.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of feelings in body.
     */
    @GetMapping("/feelings")
    public ResponseEntity<List<FeelingDTO>> getAllFeelings(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Feelings");
        Page<FeelingDTO> page = feelingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /feelings/:id} : get the "id" feeling.
     *
     * @param id the id of the feelingDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the feelingDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/feelings/{id}")
    public ResponseEntity<FeelingDTO> getFeeling(@PathVariable Long id) {
        log.debug("REST request to get Feeling : {}", id);
        Optional<FeelingDTO> feelingDTO = feelingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(feelingDTO);
    }

    /**
     * {@code DELETE  /feelings/:id} : delete the "id" feeling.
     *
     * @param id the id of the feelingDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/feelings/{id}")
    public ResponseEntity<Void> deleteFeeling(@PathVariable Long id) {
        log.debug("REST request to delete Feeling : {}", id);
        feelingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

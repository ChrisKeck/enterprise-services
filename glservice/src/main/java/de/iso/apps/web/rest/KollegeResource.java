package de.iso.apps.web.rest;

import de.iso.apps.service.KollegeService;
import de.iso.apps.web.rest.errors.BadRequestAlertException;
import de.iso.apps.service.dto.KollegeDTO;

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
 * REST controller for managing {@link de.iso.apps.domain.Kollege}.
 */
@RestController
@RequestMapping("/api")
public class KollegeResource {

    private final Logger log = LoggerFactory.getLogger(KollegeResource.class);

    private static final String ENTITY_NAME = "glserviceKollege";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KollegeService kollegeService;

    public KollegeResource(KollegeService kollegeService) {
        this.kollegeService = kollegeService;
    }

    /**
     * {@code POST  /kolleges} : Create a new kollege.
     *
     * @param kollegeDTO the kollegeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kollegeDTO, or with status {@code 400 (Bad Request)} if the kollege has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kolleges")
    public ResponseEntity<KollegeDTO> createKollege(@Valid @RequestBody KollegeDTO kollegeDTO) throws URISyntaxException {
        log.debug("REST request to save Kollege : {}", kollegeDTO);
        if (kollegeDTO.getId() != null) {
            throw new BadRequestAlertException("A new kollege cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KollegeDTO result = kollegeService.save(kollegeDTO);
        return ResponseEntity.created(new URI("/api/kolleges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kolleges} : Updates an existing kollege.
     *
     * @param kollegeDTO the kollegeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kollegeDTO,
     * or with status {@code 400 (Bad Request)} if the kollegeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kollegeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kolleges")
    public ResponseEntity<KollegeDTO> updateKollege(@Valid @RequestBody KollegeDTO kollegeDTO) throws URISyntaxException {
        log.debug("REST request to update Kollege : {}", kollegeDTO);
        if (kollegeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KollegeDTO result = kollegeService.save(kollegeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, kollegeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /kolleges} : get all the kolleges.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kolleges in body.
     */
    @GetMapping("/kolleges")
    public ResponseEntity<List<KollegeDTO>> getAllKolleges(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Kolleges");
        Page<KollegeDTO> page;
        if (eagerload) {
            page = kollegeService.findAllWithEagerRelationships(pageable);
        } else {
            page = kollegeService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /kolleges/:id} : get the "id" kollege.
     *
     * @param id the id of the kollegeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kollegeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kolleges/{id}")
    public ResponseEntity<KollegeDTO> getKollege(@PathVariable Long id) {
        log.debug("REST request to get Kollege : {}", id);
        Optional<KollegeDTO> kollegeDTO = kollegeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kollegeDTO);
    }

    /**
     * {@code DELETE  /kolleges/:id} : delete the "id" kollege.
     *
     * @param id the id of the kollegeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kolleges/{id}")
    public ResponseEntity<Void> deleteKollege(@PathVariable Long id) {
        log.debug("REST request to delete Kollege : {}", id);
        kollegeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

package de.iso.apps.web.rest;

import de.iso.apps.service.BestellungService;
import de.iso.apps.web.rest.errors.BadRequestAlertException;
import de.iso.apps.service.dto.BestellungDTO;

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
 * REST controller for managing {@link de.iso.apps.domain.Bestellung}.
 */
@RestController
@RequestMapping("/api")
public class BestellungResource {

    private final Logger log = LoggerFactory.getLogger(BestellungResource.class);

    private static final String ENTITY_NAME = "glserviceBestellung";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BestellungService bestellungService;

    public BestellungResource(BestellungService bestellungService) {
        this.bestellungService = bestellungService;
    }

    /**
     * {@code POST  /bestellungs} : Create a new bestellung.
     *
     * @param bestellungDTO the bestellungDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bestellungDTO, or with status {@code 400 (Bad Request)} if the bestellung has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bestellungs")
    public ResponseEntity<BestellungDTO> createBestellung(@Valid @RequestBody BestellungDTO bestellungDTO) throws URISyntaxException {
        log.debug("REST request to save Bestellung : {}", bestellungDTO);
        if (bestellungDTO.getId() != null) {
            throw new BadRequestAlertException("A new bestellung cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BestellungDTO result = bestellungService.save(bestellungDTO);
        return ResponseEntity.created(new URI("/api/bestellungs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bestellungs} : Updates an existing bestellung.
     *
     * @param bestellungDTO the bestellungDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bestellungDTO,
     * or with status {@code 400 (Bad Request)} if the bestellungDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bestellungDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bestellungs")
    public ResponseEntity<BestellungDTO> updateBestellung(@Valid @RequestBody BestellungDTO bestellungDTO) throws URISyntaxException {
        log.debug("REST request to update Bestellung : {}", bestellungDTO);
        if (bestellungDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BestellungDTO result = bestellungService.save(bestellungDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bestellungDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bestellungs} : get all the bestellungs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bestellungs in body.
     */
    @GetMapping("/bestellungs")
    public ResponseEntity<List<BestellungDTO>> getAllBestellungs(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Bestellungs");
        Page<BestellungDTO> page = bestellungService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bestellungs/:id} : get the "id" bestellung.
     *
     * @param id the id of the bestellungDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bestellungDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bestellungs/{id}")
    public ResponseEntity<BestellungDTO> getBestellung(@PathVariable Long id) {
        log.debug("REST request to get Bestellung : {}", id);
        Optional<BestellungDTO> bestellungDTO = bestellungService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bestellungDTO);
    }

    /**
     * {@code DELETE  /bestellungs/:id} : delete the "id" bestellung.
     *
     * @param id the id of the bestellungDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bestellungs/{id}")
    public ResponseEntity<Void> deleteBestellung(@PathVariable Long id) {
        log.debug("REST request to delete Bestellung : {}", id);
        bestellungService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

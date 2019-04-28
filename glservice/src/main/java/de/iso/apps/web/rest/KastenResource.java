package de.iso.apps.web.rest;

import de.iso.apps.service.KastenService;
import de.iso.apps.web.rest.errors.BadRequestAlertException;
import de.iso.apps.service.dto.KastenDTO;

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
 * REST controller for managing {@link de.iso.apps.domain.Kasten}.
 */
@RestController
@RequestMapping("/api")
public class KastenResource {

    private final Logger log = LoggerFactory.getLogger(KastenResource.class);

    private static final String ENTITY_NAME = "glserviceKasten";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KastenService kastenService;

    public KastenResource(KastenService kastenService) {
        this.kastenService = kastenService;
    }

    /**
     * {@code POST  /kastens} : Create a new kasten.
     *
     * @param kastenDTO the kastenDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kastenDTO, or with status {@code 400 (Bad Request)} if the kasten has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kastens")
    public ResponseEntity<KastenDTO> createKasten(@Valid @RequestBody KastenDTO kastenDTO) throws URISyntaxException {
        log.debug("REST request to save Kasten : {}", kastenDTO);
        if (kastenDTO.getId() != null) {
            throw new BadRequestAlertException("A new kasten cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KastenDTO result = kastenService.save(kastenDTO);
        return ResponseEntity.created(new URI("/api/kastens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kastens} : Updates an existing kasten.
     *
     * @param kastenDTO the kastenDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kastenDTO,
     * or with status {@code 400 (Bad Request)} if the kastenDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kastenDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kastens")
    public ResponseEntity<KastenDTO> updateKasten(@Valid @RequestBody KastenDTO kastenDTO) throws URISyntaxException {
        log.debug("REST request to update Kasten : {}", kastenDTO);
        if (kastenDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KastenDTO result = kastenService.save(kastenDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, kastenDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /kastens} : get all the kastens.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kastens in body.
     */
    @GetMapping("/kastens")
    public ResponseEntity<List<KastenDTO>> getAllKastens(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Kastens");
        Page<KastenDTO> page = kastenService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /kastens/:id} : get the "id" kasten.
     *
     * @param id the id of the kastenDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kastenDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kastens/{id}")
    public ResponseEntity<KastenDTO> getKasten(@PathVariable Long id) {
        log.debug("REST request to get Kasten : {}", id);
        Optional<KastenDTO> kastenDTO = kastenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kastenDTO);
    }

    /**
     * {@code DELETE  /kastens/:id} : delete the "id" kasten.
     *
     * @param id the id of the kastenDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kastens/{id}")
    public ResponseEntity<Void> deleteKasten(@PathVariable Long id) {
        log.debug("REST request to delete Kasten : {}", id);
        kastenService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

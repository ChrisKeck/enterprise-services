package de.iso.apps.web.rest;

import de.iso.apps.GlserviceApp;

import de.iso.apps.domain.Bestellung;
import de.iso.apps.repository.BestellungRepository;
import de.iso.apps.service.BestellungService;
import de.iso.apps.service.dto.BestellungDTO;
import de.iso.apps.service.mapper.BestellungMapper;
import de.iso.apps.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static de.iso.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import de.iso.apps.domain.enumeration.Standort;
/**
 * Integration tests for the {@Link BestellungResource} REST controller.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GlserviceApp.class)
public class BestellungResourceIT {

    private static final Standort DEFAULT_STANDORT = Standort.KUG;
    private static final Standort UPDATED_STANDORT = Standort.PETERSTRASSE;

    private static final Instant DEFAULT_VON = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VON = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_BIS = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BIS = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BestellungRepository bestellungRepository;

    @Autowired
    private BestellungMapper bestellungMapper;

    @Autowired
    private BestellungService bestellungService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBestellungMockMvc;

    private Bestellung bestellung;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BestellungResource bestellungResource = new BestellungResource(bestellungService);
        this.restBestellungMockMvc = MockMvcBuilders.standaloneSetup(bestellungResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bestellung createEntity(EntityManager em) {
        Bestellung bestellung = new Bestellung()
            .standort(DEFAULT_STANDORT)
            .von(DEFAULT_VON)
            .bis(DEFAULT_BIS);
        return bestellung;
    }

    @Before
    public void initTest() {
        bestellung = createEntity(em);
    }

    @Test
    @Transactional
    public void createBestellung() throws Exception {
        int databaseSizeBeforeCreate = bestellungRepository.findAll().size();

        // Create the Bestellung
        BestellungDTO bestellungDTO = bestellungMapper.toDto(bestellung);
        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellungDTO)))
            .andExpect(status().isCreated());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeCreate + 1);
        Bestellung testBestellung = bestellungList.get(bestellungList.size() - 1);
        assertThat(testBestellung.getStandort()).isEqualTo(DEFAULT_STANDORT);
        assertThat(testBestellung.getVon()).isEqualTo(DEFAULT_VON);
        assertThat(testBestellung.getBis()).isEqualTo(DEFAULT_BIS);
    }

    @Test
    @Transactional
    public void createBestellungWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bestellungRepository.findAll().size();

        // Create the Bestellung with an existing ID
        bestellung.setId(1L);
        BestellungDTO bestellungDTO = bestellungMapper.toDto(bestellung);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellungDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStandortIsRequired() throws Exception {
        int databaseSizeBeforeTest = bestellungRepository.findAll().size();
        // set the field null
        bestellung.setStandort(null);

        // Create the Bestellung, which fails.
        BestellungDTO bestellungDTO = bestellungMapper.toDto(bestellung);

        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellungDTO)))
            .andExpect(status().isBadRequest());

        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVonIsRequired() throws Exception {
        int databaseSizeBeforeTest = bestellungRepository.findAll().size();
        // set the field null
        bestellung.setVon(null);

        // Create the Bestellung, which fails.
        BestellungDTO bestellungDTO = bestellungMapper.toDto(bestellung);

        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellungDTO)))
            .andExpect(status().isBadRequest());

        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBisIsRequired() throws Exception {
        int databaseSizeBeforeTest = bestellungRepository.findAll().size();
        // set the field null
        bestellung.setBis(null);

        // Create the Bestellung, which fails.
        BestellungDTO bestellungDTO = bestellungMapper.toDto(bestellung);

        restBestellungMockMvc.perform(post("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellungDTO)))
            .andExpect(status().isBadRequest());

        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBestellungs() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get all the bestellungList
        restBestellungMockMvc.perform(get("/api/bestellungs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bestellung.getId().intValue())))
            .andExpect(jsonPath("$.[*].standort").value(hasItem(DEFAULT_STANDORT.toString())))
            .andExpect(jsonPath("$.[*].von").value(hasItem(DEFAULT_VON.toString())))
            .andExpect(jsonPath("$.[*].bis").value(hasItem(DEFAULT_BIS.toString())));
    }
    
    @Test
    @Transactional
    public void getBestellung() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        // Get the bestellung
        restBestellungMockMvc.perform(get("/api/bestellungs/{id}", bestellung.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bestellung.getId().intValue()))
            .andExpect(jsonPath("$.standort").value(DEFAULT_STANDORT.toString()))
            .andExpect(jsonPath("$.von").value(DEFAULT_VON.toString()))
            .andExpect(jsonPath("$.bis").value(DEFAULT_BIS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBestellung() throws Exception {
        // Get the bestellung
        restBestellungMockMvc.perform(get("/api/bestellungs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBestellung() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        int databaseSizeBeforeUpdate = bestellungRepository.findAll().size();

        // Update the bestellung
        Bestellung updatedBestellung = bestellungRepository.findById(bestellung.getId()).get();
        // Disconnect from session so that the updates on updatedBestellung are not directly saved in db
        em.detach(updatedBestellung);
        updatedBestellung
            .standort(UPDATED_STANDORT)
            .von(UPDATED_VON)
            .bis(UPDATED_BIS);
        BestellungDTO bestellungDTO = bestellungMapper.toDto(updatedBestellung);

        restBestellungMockMvc.perform(put("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellungDTO)))
            .andExpect(status().isOk());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeUpdate);
        Bestellung testBestellung = bestellungList.get(bestellungList.size() - 1);
        assertThat(testBestellung.getStandort()).isEqualTo(UPDATED_STANDORT);
        assertThat(testBestellung.getVon()).isEqualTo(UPDATED_VON);
        assertThat(testBestellung.getBis()).isEqualTo(UPDATED_BIS);
    }

    @Test
    @Transactional
    public void updateNonExistingBestellung() throws Exception {
        int databaseSizeBeforeUpdate = bestellungRepository.findAll().size();

        // Create the Bestellung
        BestellungDTO bestellungDTO = bestellungMapper.toDto(bestellung);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBestellungMockMvc.perform(put("/api/bestellungs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bestellungDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bestellung in the database
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBestellung() throws Exception {
        // Initialize the database
        bestellungRepository.saveAndFlush(bestellung);

        int databaseSizeBeforeDelete = bestellungRepository.findAll().size();

        // Delete the bestellung
        restBestellungMockMvc.perform(delete("/api/bestellungs/{id}", bestellung.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Bestellung> bestellungList = bestellungRepository.findAll();
        assertThat(bestellungList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bestellung.class);
        Bestellung bestellung1 = new Bestellung();
        bestellung1.setId(1L);
        Bestellung bestellung2 = new Bestellung();
        bestellung2.setId(bestellung1.getId());
        assertThat(bestellung1).isEqualTo(bestellung2);
        bestellung2.setId(2L);
        assertThat(bestellung1).isNotEqualTo(bestellung2);
        bestellung1.setId(null);
        assertThat(bestellung1).isNotEqualTo(bestellung2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BestellungDTO.class);
        BestellungDTO bestellungDTO1 = new BestellungDTO();
        bestellungDTO1.setId(1L);
        BestellungDTO bestellungDTO2 = new BestellungDTO();
        assertThat(bestellungDTO1).isNotEqualTo(bestellungDTO2);
        bestellungDTO2.setId(bestellungDTO1.getId());
        assertThat(bestellungDTO1).isEqualTo(bestellungDTO2);
        bestellungDTO2.setId(2L);
        assertThat(bestellungDTO1).isNotEqualTo(bestellungDTO2);
        bestellungDTO1.setId(null);
        assertThat(bestellungDTO1).isNotEqualTo(bestellungDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bestellungMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bestellungMapper.fromId(null)).isNull();
    }
}
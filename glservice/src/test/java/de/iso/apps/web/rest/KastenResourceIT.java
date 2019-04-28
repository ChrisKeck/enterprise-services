package de.iso.apps.web.rest;

import de.iso.apps.GlserviceApp;

import de.iso.apps.domain.Kasten;
import de.iso.apps.repository.KastenRepository;
import de.iso.apps.service.KastenService;
import de.iso.apps.service.dto.KastenDTO;
import de.iso.apps.service.mapper.KastenMapper;
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
import java.util.List;


import static de.iso.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import de.iso.apps.domain.enumeration.Sorte;
/**
 * Integration tests for the {@Link KastenResource} REST controller.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GlserviceApp.class)
public class KastenResourceIT {

    private static final Sorte DEFAULT_SORTE = Sorte.MEDIUM;
    private static final Sorte UPDATED_SORTE = Sorte.SPRIZIG;

    @Autowired
    private KastenRepository kastenRepository;

    @Autowired
    private KastenMapper kastenMapper;

    @Autowired
    private KastenService kastenService;

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

    private MockMvc restKastenMockMvc;

    private Kasten kasten;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KastenResource kastenResource = new KastenResource(kastenService);
        this.restKastenMockMvc = MockMvcBuilders.standaloneSetup(kastenResource)
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
    public static Kasten createEntity(EntityManager em) {
        Kasten kasten = new Kasten()
            .sorte(DEFAULT_SORTE);
        return kasten;
    }

    @Before
    public void initTest() {
        kasten = createEntity(em);
    }

    @Test
    @Transactional
    public void createKasten() throws Exception {
        int databaseSizeBeforeCreate = kastenRepository.findAll().size();

        // Create the Kasten
        KastenDTO kastenDTO = kastenMapper.toDto(kasten);
        restKastenMockMvc.perform(post("/api/kastens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kastenDTO)))
            .andExpect(status().isCreated());

        // Validate the Kasten in the database
        List<Kasten> kastenList = kastenRepository.findAll();
        assertThat(kastenList).hasSize(databaseSizeBeforeCreate + 1);
        Kasten testKasten = kastenList.get(kastenList.size() - 1);
        assertThat(testKasten.getSorte()).isEqualTo(DEFAULT_SORTE);
    }

    @Test
    @Transactional
    public void createKastenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kastenRepository.findAll().size();

        // Create the Kasten with an existing ID
        kasten.setId(1L);
        KastenDTO kastenDTO = kastenMapper.toDto(kasten);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKastenMockMvc.perform(post("/api/kastens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kastenDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Kasten in the database
        List<Kasten> kastenList = kastenRepository.findAll();
        assertThat(kastenList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSorteIsRequired() throws Exception {
        int databaseSizeBeforeTest = kastenRepository.findAll().size();
        // set the field null
        kasten.setSorte(null);

        // Create the Kasten, which fails.
        KastenDTO kastenDTO = kastenMapper.toDto(kasten);

        restKastenMockMvc.perform(post("/api/kastens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kastenDTO)))
            .andExpect(status().isBadRequest());

        List<Kasten> kastenList = kastenRepository.findAll();
        assertThat(kastenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKastens() throws Exception {
        // Initialize the database
        kastenRepository.saveAndFlush(kasten);

        // Get all the kastenList
        restKastenMockMvc.perform(get("/api/kastens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kasten.getId().intValue())))
            .andExpect(jsonPath("$.[*].sorte").value(hasItem(DEFAULT_SORTE.toString())));
    }
    
    @Test
    @Transactional
    public void getKasten() throws Exception {
        // Initialize the database
        kastenRepository.saveAndFlush(kasten);

        // Get the kasten
        restKastenMockMvc.perform(get("/api/kastens/{id}", kasten.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kasten.getId().intValue()))
            .andExpect(jsonPath("$.sorte").value(DEFAULT_SORTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKasten() throws Exception {
        // Get the kasten
        restKastenMockMvc.perform(get("/api/kastens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKasten() throws Exception {
        // Initialize the database
        kastenRepository.saveAndFlush(kasten);

        int databaseSizeBeforeUpdate = kastenRepository.findAll().size();

        // Update the kasten
        Kasten updatedKasten = kastenRepository.findById(kasten.getId()).get();
        // Disconnect from session so that the updates on updatedKasten are not directly saved in db
        em.detach(updatedKasten);
        updatedKasten
            .sorte(UPDATED_SORTE);
        KastenDTO kastenDTO = kastenMapper.toDto(updatedKasten);

        restKastenMockMvc.perform(put("/api/kastens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kastenDTO)))
            .andExpect(status().isOk());

        // Validate the Kasten in the database
        List<Kasten> kastenList = kastenRepository.findAll();
        assertThat(kastenList).hasSize(databaseSizeBeforeUpdate);
        Kasten testKasten = kastenList.get(kastenList.size() - 1);
        assertThat(testKasten.getSorte()).isEqualTo(UPDATED_SORTE);
    }

    @Test
    @Transactional
    public void updateNonExistingKasten() throws Exception {
        int databaseSizeBeforeUpdate = kastenRepository.findAll().size();

        // Create the Kasten
        KastenDTO kastenDTO = kastenMapper.toDto(kasten);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKastenMockMvc.perform(put("/api/kastens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kastenDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Kasten in the database
        List<Kasten> kastenList = kastenRepository.findAll();
        assertThat(kastenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKasten() throws Exception {
        // Initialize the database
        kastenRepository.saveAndFlush(kasten);

        int databaseSizeBeforeDelete = kastenRepository.findAll().size();

        // Delete the kasten
        restKastenMockMvc.perform(delete("/api/kastens/{id}", kasten.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Kasten> kastenList = kastenRepository.findAll();
        assertThat(kastenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Kasten.class);
        Kasten kasten1 = new Kasten();
        kasten1.setId(1L);
        Kasten kasten2 = new Kasten();
        kasten2.setId(kasten1.getId());
        assertThat(kasten1).isEqualTo(kasten2);
        kasten2.setId(2L);
        assertThat(kasten1).isNotEqualTo(kasten2);
        kasten1.setId(null);
        assertThat(kasten1).isNotEqualTo(kasten2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KastenDTO.class);
        KastenDTO kastenDTO1 = new KastenDTO();
        kastenDTO1.setId(1L);
        KastenDTO kastenDTO2 = new KastenDTO();
        assertThat(kastenDTO1).isNotEqualTo(kastenDTO2);
        kastenDTO2.setId(kastenDTO1.getId());
        assertThat(kastenDTO1).isEqualTo(kastenDTO2);
        kastenDTO2.setId(2L);
        assertThat(kastenDTO1).isNotEqualTo(kastenDTO2);
        kastenDTO1.setId(null);
        assertThat(kastenDTO1).isNotEqualTo(kastenDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(kastenMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(kastenMapper.fromId(null)).isNull();
    }
}
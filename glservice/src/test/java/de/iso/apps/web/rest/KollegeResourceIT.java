package de.iso.apps.web.rest;

import de.iso.apps.GlserviceApp;

import de.iso.apps.domain.Kollege;
import de.iso.apps.repository.KollegeRepository;
import de.iso.apps.service.KollegeService;
import de.iso.apps.service.dto.KollegeDTO;
import de.iso.apps.service.mapper.KollegeMapper;
import de.iso.apps.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static de.iso.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link KollegeResource} REST controller.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GlserviceApp.class)
public class KollegeResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private KollegeRepository kollegeRepository;

    @Mock
    private KollegeRepository kollegeRepositoryMock;

    @Autowired
    private KollegeMapper kollegeMapper;

    @Mock
    private KollegeService kollegeServiceMock;

    @Autowired
    private KollegeService kollegeService;

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

    private MockMvc restKollegeMockMvc;

    private Kollege kollege;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KollegeResource kollegeResource = new KollegeResource(kollegeService);
        this.restKollegeMockMvc = MockMvcBuilders.standaloneSetup(kollegeResource)
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
    public static Kollege createEntity(EntityManager em) {
        Kollege kollege = new Kollege()
            .email(DEFAULT_EMAIL);
        return kollege;
    }

    @Before
    public void initTest() {
        kollege = createEntity(em);
    }

    @Test
    @Transactional
    public void createKollege() throws Exception {
        int databaseSizeBeforeCreate = kollegeRepository.findAll().size();

        // Create the Kollege
        KollegeDTO kollegeDTO = kollegeMapper.toDto(kollege);
        restKollegeMockMvc.perform(post("/api/kolleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kollegeDTO)))
            .andExpect(status().isCreated());

        // Validate the Kollege in the database
        List<Kollege> kollegeList = kollegeRepository.findAll();
        assertThat(kollegeList).hasSize(databaseSizeBeforeCreate + 1);
        Kollege testKollege = kollegeList.get(kollegeList.size() - 1);
        assertThat(testKollege.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createKollegeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kollegeRepository.findAll().size();

        // Create the Kollege with an existing ID
        kollege.setId(1L);
        KollegeDTO kollegeDTO = kollegeMapper.toDto(kollege);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKollegeMockMvc.perform(post("/api/kolleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kollegeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Kollege in the database
        List<Kollege> kollegeList = kollegeRepository.findAll();
        assertThat(kollegeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = kollegeRepository.findAll().size();
        // set the field null
        kollege.setEmail(null);

        // Create the Kollege, which fails.
        KollegeDTO kollegeDTO = kollegeMapper.toDto(kollege);

        restKollegeMockMvc.perform(post("/api/kolleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kollegeDTO)))
            .andExpect(status().isBadRequest());

        List<Kollege> kollegeList = kollegeRepository.findAll();
        assertThat(kollegeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKolleges() throws Exception {
        // Initialize the database
        kollegeRepository.saveAndFlush(kollege);

        // Get all the kollegeList
        restKollegeMockMvc.perform(get("/api/kolleges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kollege.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllKollegesWithEagerRelationshipsIsEnabled() throws Exception {
        KollegeResource kollegeResource = new KollegeResource(kollegeServiceMock);
        when(kollegeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restKollegeMockMvc = MockMvcBuilders.standaloneSetup(kollegeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restKollegeMockMvc.perform(get("/api/kolleges?eagerload=true"))
        .andExpect(status().isOk());

        verify(kollegeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllKollegesWithEagerRelationshipsIsNotEnabled() throws Exception {
        KollegeResource kollegeResource = new KollegeResource(kollegeServiceMock);
            when(kollegeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restKollegeMockMvc = MockMvcBuilders.standaloneSetup(kollegeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restKollegeMockMvc.perform(get("/api/kolleges?eagerload=true"))
        .andExpect(status().isOk());

            verify(kollegeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getKollege() throws Exception {
        // Initialize the database
        kollegeRepository.saveAndFlush(kollege);

        // Get the kollege
        restKollegeMockMvc.perform(get("/api/kolleges/{id}", kollege.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kollege.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKollege() throws Exception {
        // Get the kollege
        restKollegeMockMvc.perform(get("/api/kolleges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKollege() throws Exception {
        // Initialize the database
        kollegeRepository.saveAndFlush(kollege);

        int databaseSizeBeforeUpdate = kollegeRepository.findAll().size();

        // Update the kollege
        Kollege updatedKollege = kollegeRepository.findById(kollege.getId()).get();
        // Disconnect from session so that the updates on updatedKollege are not directly saved in db
        em.detach(updatedKollege);
        updatedKollege
            .email(UPDATED_EMAIL);
        KollegeDTO kollegeDTO = kollegeMapper.toDto(updatedKollege);

        restKollegeMockMvc.perform(put("/api/kolleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kollegeDTO)))
            .andExpect(status().isOk());

        // Validate the Kollege in the database
        List<Kollege> kollegeList = kollegeRepository.findAll();
        assertThat(kollegeList).hasSize(databaseSizeBeforeUpdate);
        Kollege testKollege = kollegeList.get(kollegeList.size() - 1);
        assertThat(testKollege.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingKollege() throws Exception {
        int databaseSizeBeforeUpdate = kollegeRepository.findAll().size();

        // Create the Kollege
        KollegeDTO kollegeDTO = kollegeMapper.toDto(kollege);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKollegeMockMvc.perform(put("/api/kolleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kollegeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Kollege in the database
        List<Kollege> kollegeList = kollegeRepository.findAll();
        assertThat(kollegeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKollege() throws Exception {
        // Initialize the database
        kollegeRepository.saveAndFlush(kollege);

        int databaseSizeBeforeDelete = kollegeRepository.findAll().size();

        // Delete the kollege
        restKollegeMockMvc.perform(delete("/api/kolleges/{id}", kollege.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Kollege> kollegeList = kollegeRepository.findAll();
        assertThat(kollegeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Kollege.class);
        Kollege kollege1 = new Kollege();
        kollege1.setId(1L);
        Kollege kollege2 = new Kollege();
        kollege2.setId(kollege1.getId());
        assertThat(kollege1).isEqualTo(kollege2);
        kollege2.setId(2L);
        assertThat(kollege1).isNotEqualTo(kollege2);
        kollege1.setId(null);
        assertThat(kollege1).isNotEqualTo(kollege2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KollegeDTO.class);
        KollegeDTO kollegeDTO1 = new KollegeDTO();
        kollegeDTO1.setId(1L);
        KollegeDTO kollegeDTO2 = new KollegeDTO();
        assertThat(kollegeDTO1).isNotEqualTo(kollegeDTO2);
        kollegeDTO2.setId(kollegeDTO1.getId());
        assertThat(kollegeDTO1).isEqualTo(kollegeDTO2);
        kollegeDTO2.setId(2L);
        assertThat(kollegeDTO1).isNotEqualTo(kollegeDTO2);
        kollegeDTO1.setId(null);
        assertThat(kollegeDTO1).isNotEqualTo(kollegeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(kollegeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(kollegeMapper.fromId(null)).isNull();
    }
}
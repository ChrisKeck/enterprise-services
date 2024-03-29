package de.iso.apps.web.rest;

import de.iso.apps.EfwserviceApp;

import de.iso.apps.domain.Feeling;
import de.iso.apps.repository.FeelingRepository;
import de.iso.apps.service.FeelingService;
import de.iso.apps.service.dto.FeelingDTO;
import de.iso.apps.service.mapper.FeelingMapper;
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

import de.iso.apps.domain.enumeration.FeelType;
/**
 * Integration tests for the {@Link FeelingResource} REST controller.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EfwserviceApp.class)
public class FeelingResourceIT {

    private static final FeelType DEFAULT_FEELTYPE = FeelType.ANGRY;
    private static final FeelType UPDATED_FEELTYPE = FeelType.SAD;

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;

    private static final Boolean DEFAULT_IS_SPEECHABLE = false;
    private static final Boolean UPDATED_IS_SPEECHABLE = true;

    @Autowired
    private FeelingRepository feelingRepository;

    @Autowired
    private FeelingMapper feelingMapper;

    @Autowired
    private FeelingService feelingService;

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

    private MockMvc restFeelingMockMvc;

    private Feeling feeling;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FeelingResource feelingResource = new FeelingResource(feelingService);
        this.restFeelingMockMvc = MockMvcBuilders.standaloneSetup(feelingResource)
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
    public static Feeling createEntity(EntityManager em) {
        Feeling feeling = new Feeling()
            .feeltype(DEFAULT_FEELTYPE)
            .capacity(DEFAULT_CAPACITY)
            .isSpeechable(DEFAULT_IS_SPEECHABLE);
        return feeling;
    }

    @Before
    public void initTest() {
        feeling = createEntity(em);
    }

    @Test
    @Transactional
    public void createFeeling() throws Exception {
        int databaseSizeBeforeCreate = feelingRepository.findAll().size();

        // Create the Feeling
        FeelingDTO feelingDTO = feelingMapper.toDto(feeling);
        restFeelingMockMvc.perform(post("/api/feelings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feelingDTO)))
            .andExpect(status().isCreated());

        // Validate the Feeling in the database
        List<Feeling> feelingList = feelingRepository.findAll();
        assertThat(feelingList).hasSize(databaseSizeBeforeCreate + 1);
        Feeling testFeeling = feelingList.get(feelingList.size() - 1);
        assertThat(testFeeling.getFeeltype()).isEqualTo(DEFAULT_FEELTYPE);
        assertThat(testFeeling.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
        assertThat(testFeeling.isIsSpeechable()).isEqualTo(DEFAULT_IS_SPEECHABLE);
    }

    @Test
    @Transactional
    public void createFeelingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = feelingRepository.findAll().size();

        // Create the Feeling with an existing ID
        feeling.setId(1L);
        FeelingDTO feelingDTO = feelingMapper.toDto(feeling);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFeelingMockMvc.perform(post("/api/feelings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feelingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Feeling in the database
        List<Feeling> feelingList = feelingRepository.findAll();
        assertThat(feelingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFeeltypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = feelingRepository.findAll().size();
        // set the field null
        feeling.setFeeltype(null);

        // Create the Feeling, which fails.
        FeelingDTO feelingDTO = feelingMapper.toDto(feeling);

        restFeelingMockMvc.perform(post("/api/feelings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feelingDTO)))
            .andExpect(status().isBadRequest());

        List<Feeling> feelingList = feelingRepository.findAll();
        assertThat(feelingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCapacityIsRequired() throws Exception {
        int databaseSizeBeforeTest = feelingRepository.findAll().size();
        // set the field null
        feeling.setCapacity(null);

        // Create the Feeling, which fails.
        FeelingDTO feelingDTO = feelingMapper.toDto(feeling);

        restFeelingMockMvc.perform(post("/api/feelings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feelingDTO)))
            .andExpect(status().isBadRequest());

        List<Feeling> feelingList = feelingRepository.findAll();
        assertThat(feelingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFeelings() throws Exception {
        // Initialize the database
        feelingRepository.saveAndFlush(feeling);

        // Get all the feelingList
        restFeelingMockMvc.perform(get("/api/feelings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(feeling.getId().intValue())))
            .andExpect(jsonPath("$.[*].feeltype").value(hasItem(DEFAULT_FEELTYPE.toString())))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].isSpeechable").value(hasItem(DEFAULT_IS_SPEECHABLE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getFeeling() throws Exception {
        // Initialize the database
        feelingRepository.saveAndFlush(feeling);

        // Get the feeling
        restFeelingMockMvc.perform(get("/api/feelings/{id}", feeling.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(feeling.getId().intValue()))
            .andExpect(jsonPath("$.feeltype").value(DEFAULT_FEELTYPE.toString()))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY))
            .andExpect(jsonPath("$.isSpeechable").value(DEFAULT_IS_SPEECHABLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFeeling() throws Exception {
        // Get the feeling
        restFeelingMockMvc.perform(get("/api/feelings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFeeling() throws Exception {
        // Initialize the database
        feelingRepository.saveAndFlush(feeling);

        int databaseSizeBeforeUpdate = feelingRepository.findAll().size();

        // Update the feeling
        Feeling updatedFeeling = feelingRepository.findById(feeling.getId()).get();
        // Disconnect from session so that the updates on updatedFeeling are not directly saved in db
        em.detach(updatedFeeling);
        updatedFeeling
            .feeltype(UPDATED_FEELTYPE)
            .capacity(UPDATED_CAPACITY)
            .isSpeechable(UPDATED_IS_SPEECHABLE);
        FeelingDTO feelingDTO = feelingMapper.toDto(updatedFeeling);

        restFeelingMockMvc.perform(put("/api/feelings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feelingDTO)))
            .andExpect(status().isOk());

        // Validate the Feeling in the database
        List<Feeling> feelingList = feelingRepository.findAll();
        assertThat(feelingList).hasSize(databaseSizeBeforeUpdate);
        Feeling testFeeling = feelingList.get(feelingList.size() - 1);
        assertThat(testFeeling.getFeeltype()).isEqualTo(UPDATED_FEELTYPE);
        assertThat(testFeeling.getCapacity()).isEqualTo(UPDATED_CAPACITY);
        assertThat(testFeeling.isIsSpeechable()).isEqualTo(UPDATED_IS_SPEECHABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingFeeling() throws Exception {
        int databaseSizeBeforeUpdate = feelingRepository.findAll().size();

        // Create the Feeling
        FeelingDTO feelingDTO = feelingMapper.toDto(feeling);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFeelingMockMvc.perform(put("/api/feelings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feelingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Feeling in the database
        List<Feeling> feelingList = feelingRepository.findAll();
        assertThat(feelingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFeeling() throws Exception {
        // Initialize the database
        feelingRepository.saveAndFlush(feeling);

        int databaseSizeBeforeDelete = feelingRepository.findAll().size();

        // Delete the feeling
        restFeelingMockMvc.perform(delete("/api/feelings/{id}", feeling.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Feeling> feelingList = feelingRepository.findAll();
        assertThat(feelingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Feeling.class);
        Feeling feeling1 = new Feeling();
        feeling1.setId(1L);
        Feeling feeling2 = new Feeling();
        feeling2.setId(feeling1.getId());
        assertThat(feeling1).isEqualTo(feeling2);
        feeling2.setId(2L);
        assertThat(feeling1).isNotEqualTo(feeling2);
        feeling1.setId(null);
        assertThat(feeling1).isNotEqualTo(feeling2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FeelingDTO.class);
        FeelingDTO feelingDTO1 = new FeelingDTO();
        feelingDTO1.setId(1L);
        FeelingDTO feelingDTO2 = new FeelingDTO();
        assertThat(feelingDTO1).isNotEqualTo(feelingDTO2);
        feelingDTO2.setId(feelingDTO1.getId());
        assertThat(feelingDTO1).isEqualTo(feelingDTO2);
        feelingDTO2.setId(2L);
        assertThat(feelingDTO1).isNotEqualTo(feelingDTO2);
        feelingDTO1.setId(null);
        assertThat(feelingDTO1).isNotEqualTo(feelingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(feelingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(feelingMapper.fromId(null)).isNull();
    }
}
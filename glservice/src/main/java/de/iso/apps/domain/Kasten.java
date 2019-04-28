package de.iso.apps.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import de.iso.apps.domain.enumeration.Sorte;

/**
 * A Kasten.
 */
@Entity
@Table(name = "kasten")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Kasten implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sorte", nullable = false)
    private Sorte sorte;

    @ManyToOne
    @JsonIgnoreProperties("kastens")
    private Bestellung bestellung;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sorte getSorte() {
        return sorte;
    }

    public Kasten sorte(Sorte sorte) {
        this.sorte = sorte;
        return this;
    }

    public void setSorte(Sorte sorte) {
        this.sorte = sorte;
    }

    public Bestellung getBestellung() {
        return bestellung;
    }

    public Kasten bestellung(Bestellung bestellung) {
        this.bestellung = bestellung;
        return this;
    }

    public void setBestellung(Bestellung bestellung) {
        this.bestellung = bestellung;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Kasten)) {
            return false;
        }
        return id != null && id.equals(((Kasten) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Kasten{" +
            "id=" + getId() +
            ", sorte='" + getSorte() + "'" +
            "}";
    }
}

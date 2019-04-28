package de.iso.apps.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import de.iso.apps.domain.enumeration.Standort;

/**
 * A Bestellung.
 */
@Entity
@Table(name = "bestellung")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bestellung implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "standort", nullable = false)
    private Standort standort;

    @NotNull
    @Column(name = "von", nullable = false)
    private Instant von;

    @NotNull
    @Column(name = "bis", nullable = false)
    private Instant bis;

    @OneToMany(mappedBy = "bestellung")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Kasten> kastens = new HashSet<>();

    @ManyToMany(mappedBy = "bestellungs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Kollege> kolleges = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Standort getStandort() {
        return standort;
    }

    public Bestellung standort(Standort standort) {
        this.standort = standort;
        return this;
    }

    public void setStandort(Standort standort) {
        this.standort = standort;
    }

    public Instant getVon() {
        return von;
    }

    public Bestellung von(Instant von) {
        this.von = von;
        return this;
    }

    public void setVon(Instant von) {
        this.von = von;
    }

    public Instant getBis() {
        return bis;
    }

    public Bestellung bis(Instant bis) {
        this.bis = bis;
        return this;
    }

    public void setBis(Instant bis) {
        this.bis = bis;
    }

    public Set<Kasten> getKastens() {
        return kastens;
    }

    public Bestellung kastens(Set<Kasten> kastens) {
        this.kastens = kastens;
        return this;
    }

    public Bestellung addKasten(Kasten kasten) {
        this.kastens.add(kasten);
        kasten.setBestellung(this);
        return this;
    }

    public Bestellung removeKasten(Kasten kasten) {
        this.kastens.remove(kasten);
        kasten.setBestellung(null);
        return this;
    }

    public void setKastens(Set<Kasten> kastens) {
        this.kastens = kastens;
    }

    public Set<Kollege> getKolleges() {
        return kolleges;
    }

    public Bestellung kolleges(Set<Kollege> kolleges) {
        this.kolleges = kolleges;
        return this;
    }

    public Bestellung addKollege(Kollege kollege) {
        this.kolleges.add(kollege);
        kollege.getBestellungs().add(this);
        return this;
    }

    public Bestellung removeKollege(Kollege kollege) {
        this.kolleges.remove(kollege);
        kollege.getBestellungs().remove(this);
        return this;
    }

    public void setKolleges(Set<Kollege> kolleges) {
        this.kolleges = kolleges;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bestellung)) {
            return false;
        }
        return id != null && id.equals(((Bestellung) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Bestellung{" +
            "id=" + getId() +
            ", standort='" + getStandort() + "'" +
            ", von='" + getVon() + "'" +
            ", bis='" + getBis() + "'" +
            "}";
    }
}

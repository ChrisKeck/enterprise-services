package de.iso.apps.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Kollege.
 */
@Entity
@Table(name = "kollege")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Kollege implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "kollege_bestellung",
               joinColumns = @JoinColumn(name = "kollege_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "bestellung_id", referencedColumnName = "id"))
    private Set<Bestellung> bestellungs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public Kollege email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Bestellung> getBestellungs() {
        return bestellungs;
    }

    public Kollege bestellungs(Set<Bestellung> bestellungs) {
        this.bestellungs = bestellungs;
        return this;
    }

    public Kollege addBestellung(Bestellung bestellung) {
        this.bestellungs.add(bestellung);
        bestellung.getKolleges().add(this);
        return this;
    }

    public Kollege removeBestellung(Bestellung bestellung) {
        this.bestellungs.remove(bestellung);
        bestellung.getKolleges().remove(this);
        return this;
    }

    public void setBestellungs(Set<Bestellung> bestellungs) {
        this.bestellungs = bestellungs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Kollege)) {
            return false;
        }
        return id != null && id.equals(((Kollege) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Kollege{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            "}";
    }
}

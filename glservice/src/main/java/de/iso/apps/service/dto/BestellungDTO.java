package de.iso.apps.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import de.iso.apps.domain.enumeration.Standort;

/**
 * A DTO for the {@link de.iso.apps.domain.Bestellung} entity.
 */
public class BestellungDTO implements Serializable {

    private Long id;

    @NotNull
    private Standort standort;

    @NotNull
    private Instant von;

    @NotNull
    private Instant bis;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Standort getStandort() {
        return standort;
    }

    public void setStandort(Standort standort) {
        this.standort = standort;
    }

    public Instant getVon() {
        return von;
    }

    public void setVon(Instant von) {
        this.von = von;
    }

    public Instant getBis() {
        return bis;
    }

    public void setBis(Instant bis) {
        this.bis = bis;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BestellungDTO bestellungDTO = (BestellungDTO) o;
        if (bestellungDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bestellungDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BestellungDTO{" +
            "id=" + getId() +
            ", standort='" + getStandort() + "'" +
            ", von='" + getVon() + "'" +
            ", bis='" + getBis() + "'" +
            "}";
    }
}

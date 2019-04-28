package de.iso.apps.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import de.iso.apps.domain.enumeration.Sorte;

/**
 * A DTO for the {@link de.iso.apps.domain.Kasten} entity.
 */
public class KastenDTO implements Serializable {

    private Long id;

    @NotNull
    private Sorte sorte;


    private Long bestellungId;

    private String bestellungStandort;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sorte getSorte() {
        return sorte;
    }

    public void setSorte(Sorte sorte) {
        this.sorte = sorte;
    }

    public Long getBestellungId() {
        return bestellungId;
    }

    public void setBestellungId(Long bestellungId) {
        this.bestellungId = bestellungId;
    }

    public String getBestellungStandort() {
        return bestellungStandort;
    }

    public void setBestellungStandort(String bestellungStandort) {
        this.bestellungStandort = bestellungStandort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        KastenDTO kastenDTO = (KastenDTO) o;
        if (kastenDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kastenDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KastenDTO{" +
            "id=" + getId() +
            ", sorte='" + getSorte() + "'" +
            ", bestellung=" + getBestellungId() +
            ", bestellung='" + getBestellungStandort() + "'" +
            "}";
    }
}

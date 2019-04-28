package de.iso.apps.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link de.iso.apps.domain.Kollege} entity.
 */
public class KollegeDTO implements Serializable {

    private Long id;

    @NotNull
    private String email;


    private Set<BestellungDTO> bestellungs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<BestellungDTO> getBestellungs() {
        return bestellungs;
    }

    public void setBestellungs(Set<BestellungDTO> bestellungs) {
        this.bestellungs = bestellungs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        KollegeDTO kollegeDTO = (KollegeDTO) o;
        if (kollegeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kollegeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KollegeDTO{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            "}";
    }
}

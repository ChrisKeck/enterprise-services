package de.iso.apps.repository;

import de.iso.apps.domain.Bestellung;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Bestellung entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BestellungRepository extends JpaRepository<Bestellung, Long> {

}

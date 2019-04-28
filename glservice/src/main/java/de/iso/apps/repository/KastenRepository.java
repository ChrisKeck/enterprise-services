package de.iso.apps.repository;

import de.iso.apps.domain.Kasten;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Kasten entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KastenRepository extends JpaRepository<Kasten, Long> {

}

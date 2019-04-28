package de.iso.apps.repository;

import de.iso.apps.domain.Kollege;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Kollege entity.
 */
@Repository
public interface KollegeRepository extends JpaRepository<Kollege, Long> {

    @Query(value = "select distinct kollege from Kollege kollege left join fetch kollege.bestellungs",
        countQuery = "select count(distinct kollege) from Kollege kollege")
    Page<Kollege> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct kollege from Kollege kollege left join fetch kollege.bestellungs")
    List<Kollege> findAllWithEagerRelationships();

    @Query("select kollege from Kollege kollege left join fetch kollege.bestellungs where kollege.id =:id")
    Optional<Kollege> findOneWithEagerRelationships(@Param("id") Long id);

}

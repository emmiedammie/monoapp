package com.auth0.monoapp.repository;

import com.auth0.monoapp.domain.Rota;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Rota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RotaRepository extends JpaRepository<Rota, Long> {}

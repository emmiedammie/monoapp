package com.auth0.monoapp.web.rest;

import com.auth0.monoapp.domain.Rota;
import com.auth0.monoapp.repository.RotaRepository;
import com.auth0.monoapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.auth0.monoapp.domain.Rota}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RotaResource {

    private final Logger log = LoggerFactory.getLogger(RotaResource.class);

    private static final String ENTITY_NAME = "rota";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RotaRepository rotaRepository;

    public RotaResource(RotaRepository rotaRepository) {
        this.rotaRepository = rotaRepository;
    }

    /**
     * {@code POST  /rotas} : Create a new rota.
     *
     * @param rota the rota to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rota, or with status {@code 400 (Bad Request)} if the rota has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rotas")
    public ResponseEntity<Rota> createRota(@Valid @RequestBody Rota rota) throws URISyntaxException {
        log.debug("REST request to save Rota : {}", rota);
        if (rota.getId() != null) {
            throw new BadRequestAlertException("A new rota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rota result = rotaRepository.save(rota);
        return ResponseEntity
            .created(new URI("/api/rotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rotas/:id} : Updates an existing rota.
     *
     * @param id the id of the rota to save.
     * @param rota the rota to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rota,
     * or with status {@code 400 (Bad Request)} if the rota is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rota couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rotas/{id}")
    public ResponseEntity<Rota> updateRota(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Rota rota)
        throws URISyntaxException {
        log.debug("REST request to update Rota : {}, {}", id, rota);
        if (rota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rota.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rotaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Rota result = rotaRepository.save(rota);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rota.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rotas/:id} : Partial updates given fields of an existing rota, field will ignore if it is null
     *
     * @param id the id of the rota to save.
     * @param rota the rota to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rota,
     * or with status {@code 400 (Bad Request)} if the rota is not valid,
     * or with status {@code 404 (Not Found)} if the rota is not found,
     * or with status {@code 500 (Internal Server Error)} if the rota couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rotas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Rota> partialUpdateRota(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Rota rota
    ) throws URISyntaxException {
        log.debug("REST request to partial update Rota partially : {}, {}", id, rota);
        if (rota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rota.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rotaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Rota> result = rotaRepository
            .findById(rota.getId())
            .map(existingRota -> {
                if (rota.getClient() != null) {
                    existingRota.setClient(rota.getClient());
                }
                if (rota.getCarer() != null) {
                    existingRota.setCarer(rota.getCarer());
                }
                if (rota.getTime() != null) {
                    existingRota.setTime(rota.getTime());
                }
                if (rota.getDuration() != null) {
                    existingRota.setDuration(rota.getDuration());
                }

                return existingRota;
            })
            .map(rotaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rota.getId().toString())
        );
    }

    /**
     * {@code GET  /rotas} : get all the rotas.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rotas in body.
     */
    @GetMapping("/rotas")
    public List<Rota> getAllRotas(@RequestParam(required = false) String filter) {
        if ("visit-is-null".equals(filter)) {
            log.debug("REST request to get all Rotas where visit is null");
            return StreamSupport
                .stream(rotaRepository.findAll().spliterator(), false)
                .filter(rota -> rota.getVisit() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Rotas");
        return rotaRepository.findAll();
    }

    /**
     * {@code GET  /rotas/:id} : get the "id" rota.
     *
     * @param id the id of the rota to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rota, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rotas/{id}")
    public ResponseEntity<Rota> getRota(@PathVariable Long id) {
        log.debug("REST request to get Rota : {}", id);
        Optional<Rota> rota = rotaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rota);
    }

    /**
     * {@code DELETE  /rotas/:id} : delete the "id" rota.
     *
     * @param id the id of the rota to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rotas/{id}")
    public ResponseEntity<Void> deleteRota(@PathVariable Long id) {
        log.debug("REST request to delete Rota : {}", id);
        rotaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

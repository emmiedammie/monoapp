package com.auth0.monoapp.domain;

import com.auth0.monoapp.domain.enumeration.Days;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Carer.
 */
@Entity
@Table(name = "carer")
public class Carer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone")
    private Long phone;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "daysavailable", nullable = false)
    private Days daysavailable;

    @JsonIgnoreProperties(value = { "rota", "carer", "client" }, allowSetters = true)
    @OneToOne(mappedBy = "carer")
    private Visit visit;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Carer id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Carer name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPhone() {
        return this.phone;
    }

    public Carer phone(Long phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public Days getDaysavailable() {
        return this.daysavailable;
    }

    public Carer daysavailable(Days daysavailable) {
        this.setDaysavailable(daysavailable);
        return this;
    }

    public void setDaysavailable(Days daysavailable) {
        this.daysavailable = daysavailable;
    }

    public Visit getVisit() {
        return this.visit;
    }

    public void setVisit(Visit visit) {
        if (this.visit != null) {
            this.visit.setCarer(null);
        }
        if (visit != null) {
            visit.setCarer(this);
        }
        this.visit = visit;
    }

    public Carer visit(Visit visit) {
        this.setVisit(visit);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carer)) {
            return false;
        }
        return id != null && id.equals(((Carer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Carer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", phone=" + getPhone() +
            ", daysavailable='" + getDaysavailable() + "'" +
            "}";
    }
}

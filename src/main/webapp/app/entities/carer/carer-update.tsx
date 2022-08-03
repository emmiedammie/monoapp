import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IVisit } from 'app/shared/model/visit.model';
import { getEntities as getVisits } from 'app/entities/visit/visit.reducer';
import { ICarer } from 'app/shared/model/carer.model';
import { Days } from 'app/shared/model/enumerations/days.model';
import { getEntity, updateEntity, createEntity, reset } from './carer.reducer';

export const CarerUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const visits = useAppSelector(state => state.visit.entities);
  const carerEntity = useAppSelector(state => state.carer.entity);
  const loading = useAppSelector(state => state.carer.loading);
  const updating = useAppSelector(state => state.carer.updating);
  const updateSuccess = useAppSelector(state => state.carer.updateSuccess);
  const daysValues = Object.keys(Days);

  const handleClose = () => {
    navigate('/carer');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getVisits({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...carerEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          daysavailable: 'MONDAY',
          ...carerEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="monoappApp.carer.home.createOrEditLabel" data-cy="CarerCreateUpdateHeading">
            <Translate contentKey="monoappApp.carer.home.createOrEditLabel">Create or edit a Carer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="carer-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('monoappApp.carer.name')}
                id="carer-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField label={translate('monoappApp.carer.phone')} id="carer-phone" name="phone" data-cy="phone" type="text" />
              <ValidatedField
                label={translate('monoappApp.carer.daysavailable')}
                id="carer-daysavailable"
                name="daysavailable"
                data-cy="daysavailable"
                type="select"
              >
                {daysValues.map(days => (
                  <option value={days} key={days}>
                    {translate('monoappApp.Days.' + days)}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/carer" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CarerUpdate;

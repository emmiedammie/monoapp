import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRota } from 'app/shared/model/rota.model';
import { getEntities as getRotas } from 'app/entities/rota/rota.reducer';
import { ICarer } from 'app/shared/model/carer.model';
import { getEntities as getCarers } from 'app/entities/carer/carer.reducer';
import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { IVisit } from 'app/shared/model/visit.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { getEntity, updateEntity, createEntity, reset } from './visit.reducer';

export const VisitUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const rotas = useAppSelector(state => state.rota.entities);
  const carers = useAppSelector(state => state.carer.entities);
  const clients = useAppSelector(state => state.client.entities);
  const visitEntity = useAppSelector(state => state.visit.entity);
  const loading = useAppSelector(state => state.visit.loading);
  const updating = useAppSelector(state => state.visit.updating);
  const updateSuccess = useAppSelector(state => state.visit.updateSuccess);
  const statusValues = Object.keys(Status);

  const handleClose = () => {
    navigate('/visit');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getRotas({}));
    dispatch(getCarers({}));
    dispatch(getClients({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.timein = convertDateTimeToServer(values.timein);

    const entity = {
      ...visitEntity,
      ...values,
      rota: rotas.find(it => it.id.toString() === values.rota.toString()),
      carer: carers.find(it => it.id.toString() === values.carer.toString()),
      client: clients.find(it => it.id.toString() === values.client.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          timein: displayDefaultDateTime(),
        }
      : {
          status: 'PENDING',
          ...visitEntity,
          timein: convertDateTimeFromServer(visitEntity.timein),
          rota: visitEntity?.rota?.id,
          carer: visitEntity?.carer?.id,
          client: visitEntity?.client?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="monoappApp.visit.home.createOrEditLabel" data-cy="VisitCreateUpdateHeading">
            <Translate contentKey="monoappApp.visit.home.createOrEditLabel">Create or edit a Visit</Translate>
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
                  id="visit-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('monoappApp.visit.client')}
                id="visit-client"
                name="client"
                data-cy="client"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('monoappApp.visit.address')}
                id="visit-address"
                name="address"
                data-cy="address"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('monoappApp.visit.carer')}
                id="visit-carer"
                name="carer"
                data-cy="carer"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('monoappApp.visit.accesscode')}
                id="visit-accesscode"
                name="accesscode"
                data-cy="accesscode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('monoappApp.visit.timein')}
                id="visit-timein"
                name="timein"
                data-cy="timein"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField label={translate('monoappApp.visit.status')} id="visit-status" name="status" data-cy="status" type="select">
                {statusValues.map(status => (
                  <option value={status} key={status}>
                    {translate('monoappApp.Status.' + status)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('monoappApp.visit.timespent')}
                id="visit-timespent"
                name="timespent"
                data-cy="timespent"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField id="visit-rota" name="rota" data-cy="rota" label={translate('monoappApp.visit.rota')} type="select">
                <option value="" key="0" />
                {rotas
                  ? rotas.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="visit-carer" name="carer" data-cy="carer" label={translate('monoappApp.visit.carer')} type="select">
                <option value="" key="0" />
                {carers
                  ? carers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="visit-client" name="client" data-cy="client" label={translate('monoappApp.visit.client')} type="select">
                <option value="" key="0" />
                {clients
                  ? clients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/visit" replace color="info">
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

export default VisitUpdate;

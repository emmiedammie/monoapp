import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { DurationFormat } from 'app/shared/DurationFormat';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './rota.reducer';

export const RotaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const rotaEntity = useAppSelector(state => state.rota.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="rotaDetailsHeading">
          <Translate contentKey="monoappApp.rota.detail.title">Rota</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{rotaEntity.id}</dd>
          <dt>
            <span id="client">
              <Translate contentKey="monoappApp.rota.client">Client</Translate>
            </span>
          </dt>
          <dd>{rotaEntity.client}</dd>
          <dt>
            <span id="carer">
              <Translate contentKey="monoappApp.rota.carer">Carer</Translate>
            </span>
          </dt>
          <dd>{rotaEntity.carer}</dd>
          <dt>
            <span id="time">
              <Translate contentKey="monoappApp.rota.time">Time</Translate>
            </span>
          </dt>
          <dd>{rotaEntity.time ? <TextFormat value={rotaEntity.time} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="monoappApp.rota.duration">Duration</Translate>
            </span>
          </dt>
          <dd>
            {rotaEntity.duration ? <DurationFormat value={rotaEntity.duration} /> : null} ({rotaEntity.duration})
          </dd>
        </dl>
        <Button tag={Link} to="/rota" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rota/${rotaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RotaDetail;

import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Carer from './carer';
import Client from './client';
import Rota from './rota';
import Visit from './visit';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="carer/*" element={<Carer />} />
        <Route path="client/*" element={<Client />} />
        <Route path="rota/*" element={<Rota />} />
        <Route path="visit/*" element={<Visit />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};

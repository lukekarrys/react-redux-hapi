import React from 'react';
import { Route } from 'react-router-dom';

import Locations from './pages/locations';
import Location from './pages/location';
import NotFound from './pages/notFound';

const routes = [
  {
    exact: true,
    path: '/',
    component: Locations
  },
  {
    exact: true,
    path: '/locations',
    component: Locations
  },
  {
    exact: true,
    path: '/locations/:id',
    component: Location
  },
  {
    component: NotFound
  }
];

// Export both forms since on the server we need to analyze and match paths
// based on the array form, but we also need to render them via JSX
export default routes;
export const Routes = routes.map((route) => <Route key={route.path || 'NotFound'} {...route} />);

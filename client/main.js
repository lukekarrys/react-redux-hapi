import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Routes } from './routes';
import App from './components/app';
import configureStore from './store/client';

const store = configureStore({ initialState: window.__INITIAL_DATA__ });

render((
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          {Routes}
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

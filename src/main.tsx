import React from 'react';

import { store } from '@store/store.ts';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Router from './router/router.tsx';
import './styles/_palette.scss';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);

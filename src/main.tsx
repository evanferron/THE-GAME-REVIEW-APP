import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Ways from './config/routes.tsx';
import store from './services/store/store.ts';
import './styles/_palette.scss';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Ways />
    </Provider>
  </React.StrictMode>
);

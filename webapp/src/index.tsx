import React, { StrictMode } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '@recargas-dominicanas/core/store';
import { App } from './pages/app/app.component';
import './style.css';

ReactDom.render(
  <Provider store={store}>
    <StrictMode>
      <App/>
    </StrictMode> 
  </Provider>,
  document.querySelector('#root')
);

import React, { StrictMode } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@recargas-dominicanas/core/store';
import { App } from './pages/app/app.component';
import './style.css';

ReactDom.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </StrictMode> 
  </Provider>,
  document.querySelector('#root')
);

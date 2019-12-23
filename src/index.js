import React from 'react';
import ReactDom from 'react-dom';
import App from './pages/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';

const Root = (
  <Provider store={store}>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </Provider>
);

ReactDom.render(Root, document.getElementById('root'));

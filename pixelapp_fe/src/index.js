import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render((
  <Provider store={store}>
    { Routes }
  </Provider>
), document.getElementById('root'));

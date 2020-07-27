import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

const logger = ({dispatch, getState}) => (next) => (action) => {
    console.log('ACTION_TYPE =', action.type);
    next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(<App store={store}/>, document.getElementById('root'));


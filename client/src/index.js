import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';

import Reducer from './reducers';

import './globalStyle.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
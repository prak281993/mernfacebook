import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import authReducer from './reducers/authReducer';
import {setCurrentUser} from './actions/authActions';


const middleware=[thunk];

const rootReducer=combineReducers({
auth:authReducer
})

const initialState={}

const store=createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

if(localStorage.getItem('token')){
    var token=localStorage.getItem('token');
    var decodedToken=jwt.verify(token.substring(7),'secret');
    store.dispatch(setCurrentUser(decodedToken));
}

const app=(
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

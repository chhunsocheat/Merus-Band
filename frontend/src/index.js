import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import "antd/dist/antd.css";
import {createStore} from "redux"
import {Provider} from 'react-redux'
import rootReducer from "./reducers/rootreducer"
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'semantic-ui-css/semantic.min.css'
const persistConfig = {
  key: 'root',
  storage,
}


//making state in the redux store persistant by using redux persist
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store =createStore(persistedReducer)
const persistor=persistStore(store)



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

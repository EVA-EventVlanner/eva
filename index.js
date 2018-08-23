/** @format */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import store from './src/store/store'
import {name as appName} from './app.json';
import {Provider} from 'react-redux'

const RNRedux = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  AppRegistry.registerComponent('eva', () => RNRedux);
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/redux-store'

const store = configureStore()
const rootElement = document.getElementById('root');

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , rootElement);
}

renderApp()
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import api from './services/api';
import registerServiceWorker from './registerServiceWorker';

// window.api = api;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

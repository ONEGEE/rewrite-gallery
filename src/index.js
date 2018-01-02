import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import Gallery from './components/Gallery';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Gallery />, document.getElementById('root'));
registerServiceWorker();

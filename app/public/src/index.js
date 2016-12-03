"use strict";

console.log("React init");

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById('app-container')
    );
});
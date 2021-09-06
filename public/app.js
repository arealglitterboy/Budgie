import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import IndecisionApp from './components/IndecisionApp';
import './styles/styles.scss';

window.onload = function() {
    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
};
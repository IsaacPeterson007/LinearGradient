import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SvgEditor from '../src/components/SvgEditor';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SvgEditor />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

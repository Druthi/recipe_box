import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AddRecipe from './components/AddRecipe';
//import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase.js';



ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

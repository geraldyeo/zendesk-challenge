import React from 'react';
import ReactDOM from 'react-dom';
import TodoStore from './stores/TodoStore';
import App from './modules/App';
import './index.css';

// const todoStore = TodoStore.createStore([]);

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);

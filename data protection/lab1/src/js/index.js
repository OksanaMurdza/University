import 'react-hot-loader/patch';
// import { AppContainer } from 'react-hot-loader';
import React from 'react'
import ReactDOM from 'react-dom'

import Main from './Containers/Main/';

import '../scss/index.scss';


const rootEl = document.getElementById('root');

ReactDOM.render(
	<Main />,
	rootEl
);

if (module.hot) {
	module.hot.accept('./Containers/Main', () => {
		render(Main)
	});
}
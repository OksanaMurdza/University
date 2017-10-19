import 'react-hot-loader/patch';
// import { AppContainer } from 'react-hot-loader';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import configureStore from './REDUX/store'

import generator from './Containers/Generator/';
import view from './Containers/View/';
import facts from './Containers/Facts/';
import search from './Containers/Search/';

import '../scss/index.scss';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();


export const store = configureStore( history );   
const rootEl = document.getElementById('root');

if (module.hot) {
    
    ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div>
					<Switch>
						<Route path="/" exact component={facts}/>
						<Route path="/view" exact component={view}/>
						<Route path="/generator" exact component={generator}/>
						<Route path="/search" exact component={search}/>
					</Switch>
				</div>
			</ConnectedRouter>
		</Provider>, rootEl
    );
    module.hot.accept('./Containers/Generator', () => {
		render(generator)
	});
}
import 'react-hot-loader/patch';
// import { AppContainer } from 'react-hot-loader';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import configureStore from './REDUX/store'
import generator from './Containers/Generator/';
import '../scss/index.scss';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();


export const store = configureStore( history );   
const rootEl = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Switch>
                    <Route path="/generator" exact component={generator}/>
                    {/*<Route path="/reg" component={Registration}/>*/}
                    {/*<Route path="/map" component={MapContainer}/>*/}
				</Switch>
			</div>
		</ConnectedRouter>
	</Provider>, rootEl
);

if (module.hot) {
	module.hot.accept('./Containers/Generator', () => {
		render(generator)
	});
}
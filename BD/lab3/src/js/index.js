import 'react-hot-loader/patch';
// import { AppContainer } from 'react-hot-loader';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider } from 'material-ui/styles/';

import configureStore from './REDUX/store'

import main from './Containers/Main';


import '../scss/index.scss';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();


export const store = configureStore( history );   
const rootEl = document.getElementById('root');

const App = () => {
	return (
		<Switch>
			<Route path="/" exact component={main}/>
				</Switch>
	)
};

if (module.hot) {
    
    ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MuiThemeProvider>
					<App/>
				</MuiThemeProvider>
			</ConnectedRouter>
		</Provider>, rootEl
    );
    module.hot.accept('./Containers/Main', () => {
		render(main)
	});
}
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppRoute from './App-route.jsx';
import rootReducer from './reducers';
import 'react-table/react-table.css';
import Auth from './utils/auth';
import history from './utils/history';

import LoginPage from './pages/login-page.jsx';
import EventsIndexPage from './pages/events-index-page.jsx';
import EventsShowPage from './pages/events-show-page.jsx';
import EventsFormPage from './pages/events-form-page.jsx';
import Callback from './components/callback.jsx';
import LoggedOutLayout from './layouts/logged-out-layout.jsx';
import LoggedInLayout from './layouts/logged-in-layout.jsx';


const middleware = composeWithDevTools(applyMiddleware(promise(), thunk));
const store = createStore(rootReducer, middleware);
const auth = new Auth();

ReactDOM.render(
	<Router history={history}>
		<Provider store={store}>
			<Switch>
	            <Route exact path="/" render={(props) => {
	            	if (auth.isAuthenticated()) {
	            		return <Redirect to="/events" />
	            	} else {
	            		auth.login()
	            	}
	            }}/>
	            <AppRoute exact path="/events" renderedComponent={EventsIndexPage} layout={LoggedInLayout} auth={auth} />
	            <AppRoute exact path="/events/new" renderedComponent={EventsFormPage} layout={LoggedInLayout} auth={auth} />
	            <AppRoute exact path="/events/:id" renderedComponent={EventsShowPage} layout={LoggedInLayout} auth={auth} />
	            <AppRoute exact path="/events/edit/:id" renderedComponent={EventsFormPage} layout={LoggedInLayout} auth={auth} />
	            <Route exact path="/callback" render={(props) => {
          			return <Callback {...props} auth={auth} /> 
        		}}/>
	        </Switch>
		</Provider>
	</Router>,
    document.getElementById('root')
);
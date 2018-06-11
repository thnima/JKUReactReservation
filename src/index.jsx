import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppRoute from './App-route.jsx';
import rootReducer from './reducers';
import 'react-table/react-table.css';

import LoginPage from './pages/login-page.jsx';
import EventsIndexPage from './pages/events-index-page.jsx';
import EventsShowPage from './pages/events-show-page.jsx';
import EventsFormPage from './pages/events-form-page.jsx';
import LoggedOutLayout from './layouts/logged-out-layout.jsx';
import LoggedInLayout from './layouts/logged-in-layout.jsx';


const middleware = composeWithDevTools(applyMiddleware(promise(), thunk));
const store = createStore(rootReducer, middleware);

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Switch>
	            <AppRoute exact path="/" renderedComponent={LoginPage} layout={LoggedOutLayout} />
	            <AppRoute exact path="/events" renderedComponent={EventsIndexPage} layout={LoggedInLayout} />
	            <AppRoute exact path="/events/new" renderedComponent={EventsFormPage} layout={LoggedInLayout} />
	            <AppRoute exact path="/events/:id" renderedComponent={EventsShowPage} layout={LoggedInLayout} />
	            <AppRoute exact path="/events/edit/:id" renderedComponent={EventsFormPage} layout={LoggedInLayout} />
	        </Switch>
		</Provider>
	</BrowserRouter>,
    document.getElementById('root')
);
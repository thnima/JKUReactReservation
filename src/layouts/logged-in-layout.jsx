import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class LoggedInLayout extends Component {
  render() {
  	let view;
  	if (this.props.auth.isAuthenticated()) {
  		view = (
  			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
					<div className="container">
						<a className="navbar-brand" href="#"><strong>Veranstaltungsservice</strong></a>
						<ul className="navbar-nav">
							<li className="nav-item">
								<span className="fas fa-sign-out-alt fa-lg text-white" onClick={this.props.auth.logout}></span>
							</li>
						</ul>
					</div>
				</nav>

		        <div className="container mt-5">
		        	{this.props.children}
		       	</div>
	       	</div>
  		)
  	} else {
  		view = (<Redirect to="/" />)
  	}
    return (
	    <div className="content-page-container">
    		{view}
	    </div>
    );
  }
}
export default LoggedInLayout;
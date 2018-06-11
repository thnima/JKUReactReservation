import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoggedInLayout extends Component {
  render() {
    return (
    	<div className="content-page-container">
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<div className="container">
					<a className="navbar-brand" href="#"><strong>Veranstaltungsservice</strong></a>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="fas fa-sign-out-alt fa-lg text-white" to="/"></Link>
						</li>
					</ul>
				</div>
			</nav>

	        <div className="container mt-5">
	        	{this.props.children}
	       	</div>
       	</div>
    );
  }
}
export default LoggedInLayout;
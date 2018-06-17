import React, { Component } from 'react';

class Callback extends Component {
	componentWillMount() {
		this.handleAuthentication(this.props);
	}

	handleAuthentication(nextState, replace) {
	  if (/access_token|id_token|error/.test(nextState.location.hash)) {
	    this.props.auth.handleAuthentication();
	  }
	}

	render() {
		return (
			<div>
				isloading
			</div>
		);
	}
}

export default Callback;
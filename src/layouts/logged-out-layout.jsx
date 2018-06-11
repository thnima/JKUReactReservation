import React, { Component } from 'react';

class LoggedOutLayout extends Component {
  render() {
    return (
    	<div>
        	{this.props.children}
       	</div>
    );
  }
}
export default LoggedOutLayout;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/login.jsx';
import { setUser } from '../actions';

class LoginPage extends Component {
    render(){
		const isLoggedIn = this.props.auth.isAuthenticated();
		let view;

		if (isLoggedIn) {
			view = (<Redirect to="/" />)
		} else {
			view = (<Login setUser={this.props.setUser} />)
		}

        return (
        	{view}
        );
    }
}

const mapStateToProps = state => ({
  user: state.userStore
});

const mapDispatchToProps = dispatch => ({
  setUser: user => { dispatch(setUser(user)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
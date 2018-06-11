import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/login.jsx';
import { setUser } from '../actions';

class LoginPage extends Component {
    render(){
        return (
        	<Login setUser={this.props.setUser} />
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
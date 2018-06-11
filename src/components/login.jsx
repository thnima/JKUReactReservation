import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { registerUser } from '../api/user-api';

class UserSelector extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            user: {
                userName: '',
                isAdmin: false
            },

            loadingError: false
        };
    }

    handleChange = event => {
        let user = {...this.state.user};
        user[event.target.id] = event.target.value
        
        this.setState({
            ...this.state,
            user
        });
    }

    validateForm() {
        return this.state.user.userName.length > 0;
    }

    handleSubmit = event => {
        event.preventDefault();

        let isAdmin = false;

        if (this.state.user.userName.startsWith('admin')) {
            isAdmin = true;
        }

        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                isAdmin
            }
        }, () => {
            return registerUser(this.state.user)
                .then(response => {
                    if (response.status === 200 || response.status === 409) {
                        return response.json();
                    } else {
                        throw response;
                    }
                })
                .then(responseUser => {
                    this.props.setUser(responseUser);
                    this.props.history.push('/events');
                })
                .catch(error => {
                    this.setState({
                        ...this.state,
                        loadingError: true
                    });

                    throw(error);
                });
        });

    }

    render(){
        let errorMessage;

        if (this.state.loadingError) {
            errorMessage = (
                <div className="text-danger mt-2">Server nicht erreichbar</div>
            )
        }

        return (
          <div className='wrapper'>
            <form onSubmit={this.handleSubmit} className='form-signin'>
                <h2 className='form-signin-heading'>Bitte einloggen</h2>
                <FormGroup controlId='userName' bsSize='large'>
                    <ControlLabel className='sr-only'>Benutzername</ControlLabel>
                    <FormControl
                        autoFocus
                        className='form-control'
                        value={this.state.user.userName}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button
                    block
                    className='btn btn-lg btn-primary btn-block'
                    bsSize='large'
                    disabled={!this.validateForm()}
                    type='submit'
                >
                    Login
                </Button>
                <center>
                    {errorMessage}
                </center>
            </form>
          </div>
        );
    }
}

export default withRouter(UserSelector);
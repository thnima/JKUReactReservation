import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { updateRemoteEvent, createRemoteEvent } from '../api/event-api';
import 'react-datetime/css/react-datetime.css';

class EventForm extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {...this.props.event};
    }

    componentWillReceiveProps(newProps) {
    	this.setState({...newProps.event});
	}

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleIntChange = event => {
    	var newVal = parseInt(event.target.value) || undefined;
        this.setState({
            [event.target.id]: newVal
        });
    }

    handleDateChange = date => {
    	date = (new Date(date)).getTime();
    	this.setState({date});
    }

    handleSubmit = (event) => {
      event.preventDefault();

      if (this.state.id) {
      	this.updateEvent(this.state);
      } else {
      	this.createEvent(this.state);
      }
  	}

  	updateEvent(event) {
  		return updateRemoteEvent(event, this.props.auth.getAccessToken())
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(responseEvent => {
      			this.props.editEvent(responseEvent);
      			this.setState({
      				...this.state,
      				event: undefined
      			})
      			this.props.history.goBack();
            })
            .catch(error => {
                throw(error);
            });
  	}

  	createEvent(event) {
  		return createRemoteEvent(event, this.props.auth.getAccessToken())
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(responseEvent => {
      			this.props.addEvent(responseEvent);
      			this.setState({
      				...this.state,
      				event: undefined
      			})
      			this.props.history.goBack();
            })
            .catch(error => {
                throw(error);
            });
  	}

    render(){
    	const event = this.state;
        return (
        	<div>
                <div className="mb-3 default-icon-color cursor-pointer" onClick={this.props.history.goBack}>
                    <span className="fas fa-arrow-left fa-lg mr-2"></span>
                    zurück
                </div>

	        	<h1>{event.id ? 'Event bearbeiten' : 'Event hinzufügen'}</h1>

		  		<form onSubmit={this.handleSubmit}>
					<div className="form-group row">
						<label htmlFor="eventTitle" className="col-sm-2 col-form-label">Eventname</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="title" placeholder="Eventname" name="title" value={event.title} onChange={this.handleChange} required />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="eventDate" className="col-sm-2 col-form-label">Datum</label>
						<div className="col-sm-10">
							<DateTime value={new Date(event.date)} onChange={this.handleDateChange} locale='de' />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="eventLocation" className="col-sm-2 col-form-label">Location</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="location" placeholder="Location" name="location" value={event.location} onChange={this.handleChange} required />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="eventMaxMember" className="col-sm-2 col-form-label">Max. Teilnehmer</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="maxMember" placeholder="Maximale Anzahl der Teilnehmer" name="maxMember"  value={event.maxMember} onChange={this.handleIntChange} required />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="eventDescription" className="col-sm-2 col-form-label">Beschreibung</label>
						<div className="col-sm-10">
							<textarea  rows="4" className="form-control" name="description" placeholder="Beschreibung" id="description" value={event.description} onChange={this.handleChange}></textarea>
						</div>
					</div>


		  			<button type="submit" className="btn btn-primary mt-3">Event speichern</button>
		  		</form>
		  	</div>
        );
    }
}

export default withRouter(EventForm);

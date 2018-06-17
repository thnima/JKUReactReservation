import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { deleteRemoteEvent } from '../api/event-api';
import { deleteRemoteReservation, makeRemoteReservation } from '../api/reservation-api';

class EventForm extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    deleteEvent(eventId) {
        deleteRemoteEvent(eventId, deleteRemoteEvent)
            .then(response => {
                if (response.status === 200) {
                    this.props.deleteEvent(eventId);
                    this.props.history.goBack();
                } else {
                    throw response;
                }
            });

        this.deleteReservations();
        
    }

    deleteReservations() {
        const reservations = this.props.reservations;

        reservations.forEach(reservation => {
            deleteRemoteReservation(reservation.id, this.props.auth.getAccessToken())
                .then(response => {
                    if (response.status === 200) {
                        this.props.deleteReservation(reservation.id);
                    } else {
                        throw response;
                    }
                })
        });
    }

    makeReservation(eventId, userId, plusOne) {
        const reservation = {
            eventId,
            userId,
            plusOne
        }

        makeRemoteReservation(reservation, this.props.auth.getAccessToken())
            .then(response => {
                if (response.status === 200) {
                    this.props.makeReservation(reservation);
                } else {
                    throw response;
                }
            });
    }

    userReservations() {
        return this.props.reservations.filter(reservation => reservation.userId === this.props.user.id);
    }

    render(){
    	let adminBtn;
    	let userView;
    	const reservationCount = this.props.reservations.length;
    	const plusOneReservationCount = this.props.reservations.filter(reservation => reservation.plusOne).length;
    	const participationCount = reservationCount + plusOneReservationCount;

    	if (this.props.user.isAdmin && this.props.event.id) {
    		const url = `/events/edit/${this.props.event.id}`;

    		userView = (
    			<div>
    				<h6 className="card-subtitle mb-2 text-muted">Kapazität: {this.props.event.maxMember}</h6>
    				<h6 className="card-subtitle mb-3 text-muted">Teilnehmer: {participationCount}</h6>
    				<Link to={url} className="btn btn-primary">Event bearbeiten</Link>
    				<span className="btn btn-primary ml-2" onClick={this.deleteEvent.bind(this, this.props.event.id)}>Event löschen</span>
    			</div>
    		);
    	} else {
            if (this.userReservations().length >= 1) {
                const reservationText = this.props.reservations[0].plusOne ? "Du bist mit Begleitung angemeldet" : "Du bist angemeldet";
                userView = (
                    <div>
                        <span className="btn btn-primary" onClick={this.deleteReservations.bind(this)}>Anmeldung löschen</span>
                        <div className="small mt-1">{reservationText}</div>
                    </div>
                )
            } else {
                let additionalText = "";
                let disableParticipation = false;

                if (participationCount >= this.props.event.maxMember) {
                    additionalText = "Zu viele Teilnehmer. Anmeldung nicht mehr möglich";
                    disableParticipation = true;
                }
                userView = (
                    <div>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#selectPlusOneModal" disabled={disableParticipation}>
                          Anmelden
                        </button>
                        <div className="small mt-1">{additionalText}</div>
                    </div>
                )
            }
        }


        return (
            <div>
                <div className="mb-3 default-icon-color cursor-pointer" onClick={this.props.history.goBack}>
                    <span className="fas fa-arrow-left fa-lg mr-2"></span>
                    zurück
                </div>
                
            	<div className="card">
    				<div className="card-header">
    					Veranstaltungsinfo
    				</div>

    				<div className="card-body">
    					<h5 className="card-title">{ this.props.event.title }</h5>
        				<h6 className="card-subtitle mb-2 text-muted">
                            <span className="fas fa-map-marker-alt fa-lg event-card-icon"></span>
                            { this.props.event.location }
                        </h6>
        				<h6 className="card-subtitle mb-3 text-muted">
        					<span className="far fa-calendar fa-lg event-card-icon" aria-hidden="true"></span>
        					{ new Date(this.props.event.date).toLocaleString("de-de") }
        				</h6>
    					<p className="card-text mb-4">{ this.props.event.description }</p>

    					{userView}
    				</div>

                    <div className="modal fade" id="selectPlusOneModal" tabIndex="-1" role="dialog" aria-labelledby="selectPlusOneModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-body">
                            Kommst du mit Begleitung?
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.makeReservation.bind(this, this.props.event.id, this.props.user.id, true)} data-dismiss="modal">Ja</button>
                            <button type="button" className="btn btn-primary" onClick={this.makeReservation.bind(this, this.props.event.id, this.props.user.id, false)} data-dismiss="modal">Nein</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                          </div>
                        </div>
                      </div>
                    </div>
    			</div>
            </div>
        );
    }
}

export default withRouter(EventForm);

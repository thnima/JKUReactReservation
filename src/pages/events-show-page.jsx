import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventCard from '../components/event-card.jsx';
import ParticipantsCard from '../components/participants-card.jsx';
import { receiveEvent, receiveReservations, deleteReservation, deleteEvent, makeReservation } from '../actions';
import { fetchRemoteEvent } from '../api/event-api';
import { fetchRemoteReservations } from '../api/reservation-api';

class EventsFormPage extends Component {

    componentDidMount = () => {
      const { id } = this.props.match.params;

      this.loadEvent(id);

      this.loadReservations({eventId: id});
    }

    loadEvent(eventId) {
      fetchRemoteEvent(eventId, this.props.auth.getAccessToken())
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response;
            }
        })
        .then(responseEvent => {
            this.props.receiveEvent(responseEvent);
        })
        .catch(error => {
            throw(error);
        });
    }

    loadReservations({eventId, userId}) {
      fetchRemoteReservations({eventId, userId}, this.props.auth.getAccessToken())
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response;
            }
        })
        .then(responseReservations => {
            this.props.receiveReservations(responseReservations);
        })
        .catch(error => {
            throw(error);
        });
    }

    render(){
        let adminView;
        let view;

        if (this.props.user.isAdmin) {
          adminView = (
            <ParticipantsCard reservations={this.props.reservations} deleteReservation={this.props.deleteReservation} />
          );
        }

        return (     
          <div>
            <EventCard 
              event={this.props.event} 
              user={this.props.user} 
              reservations={this.props.reservations} 
              deleteEvent={this.props.deleteEvent} 
              deleteReservation={this.props.deleteReservation} 
              makeReservation={this.props.makeReservation} 
              auth={this.props.auth}
            />
            {adminView}
          </div>       
        );
    }
}

const mapStateToProps = state => ({
  event: state.eventStore.event,
  reservations: state.reservationStore.reservations,
  user: state.userStore
});

const mapDispatchToProps = dispatch => ({
  receiveEvent: (event) => { dispatch(receiveEvent(event)) },
  deleteEvent: (eventId) => { dispatch(deleteEvent(eventId)) },
  receiveReservations: (reservations) => { dispatch(receiveReservations(reservations)) },
  deleteReservation: (reservationId) => { dispatch(deleteReservation(reservationId)) },
  makeReservation: (reservation) => { dispatch(makeReservation(reservation)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsFormPage);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventForm from '../components/event-form.jsx';
import { receiveEvent, addEvent, editEvent, newEvent } from '../actions';
import { fetchRemoteEvent } from '../api/event-api';

class EventsFormPage extends Component {

    componentDidMount = () => {
      const { id } = this.props.match.params;
      if(id){
        this.loadEvent(id);
      } else {
        this.props.newEvent()
      }
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
          this.props.receiveEvent(responseEvent)
        })
        .catch(error => {
            throw(error);
        });
    }

    render(){
        return (
        	<EventForm event={this.props.event} editEvent={this.props.editEvent} addEvent={this.props.addEvent} />
        );
    }
}

const mapStateToProps = state => ({
  event: state.eventStore.event
});

const mapDispatchToProps = dispatch => ({
  receiveEvent: (eventId) => { dispatch(receiveEvent(eventId)) },
  newEvent: () => { dispatch(newEvent()) },
  addEvent: (event) => { dispatch(addEvent(event)) },
  editEvent: (event) => { dispatch(editEvent(event)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsFormPage);
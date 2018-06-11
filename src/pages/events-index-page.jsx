import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventsTable from '../components/events-table.jsx';
import { receiveEvents } from '../actions';
import { fetchRemoteEvents } from '../api/event-api';

class EventsIndexPage extends Component {
	componentDidMount() {
		fetchRemoteEvents()
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(responseEvents => {
                this.props.receiveEvents(responseEvents);
            })
            .catch(error => {
                throw(error);
            });
  	}

    render(){
        return (
        	<EventsTable user={this.props.user} events={this.props.events} />
        );
    }
}

const mapStateToProps = state => ({
  user: state.userStore,
  events: state.eventStore.events
});

const mapDispatchToProps = dispatch => ({
  receiveEvents: (events) => { dispatch(receiveEvents(events)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndexPage);
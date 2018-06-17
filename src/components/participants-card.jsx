import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import { registerUser, fetchRemoteUser } from '../api/user-api';
import { deleteRemoteReservation } from '../api/reservation-api';

class ParticipantsCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: this.props.reservations
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            ...this.state,
            reservations: newProps.reservations
        });
    }

    deleteReservation(reservationId) {
        deleteRemoteReservation(reservationId, this.props.auth.getAccessToken())
            .then(response => {
                if (response.status === 200) {
                    this.props.deleteReservation(reservationId);
                } else {
                    throw response;
                }
            })
    }

    render(){
        let data = this.state.reservations;

        data.forEach(reservation => {
            if (reservation.user){
                return;
            }
            fetchRemoteUser(reservation.userId)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw response;
                    }
                })
                .then(responseUser => {
                    const reservations = [...this.state.reservations];
                    reservations.map(r => {
                        if (r.id === reservation.id) {
                            r.user = responseUser
                        }

                        return r;
                    });

                    this.setState({
                        ...this.state,
                        reservations
                    });
                })
                .catch(error => {
                    throw(error);
            });
        });

        let columns = [{
            id: 'userName',
            Header: 'Name',
            accessor: reservation => {
                const user = reservation.user;

                if (user) {
                    return user.userName
                } else {
                    return (<span className='text-danger'>Could not load Username</span>)
                }
            }
        }, {
            id: 'plusOne',
            Header: 'Begleitung',
            accessor: reservation => {
                if (reservation.plusOne) {
                    return (
                        <span className="fas fa-check fa-lg event-card-icon default-icon-color"></span>
                    )
                }
            },
        }, {
            Header: 'Aktion',
            Cell: rowInfo => (
                <span onClick={this.deleteReservation.bind(this, rowInfo.original.id)}>
                        <span className="far fa-trash-alt fa-lg event-card-icon default-icon-color cursor-pointer"></span>
                </span>
            )
        }];

        return (
        	<div className="card mt-4">
				<div className="card-header">
					Angemeldete Teilnehmer
				</div>
				<div className="card-body">
                    <ReactTable
                        data={data}
                        columns={columns}
                        minRows={2}
                        className="-striped -highlight"
                    />
				</div>
			</div>
        );
    }
}

export default ParticipantsCard;

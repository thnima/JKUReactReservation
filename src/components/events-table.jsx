import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { withRouter, Link } from 'react-router-dom';

class EventsTable extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    render(){
        const data = this.props.events;

        let columns = [{
            Header: 'Event',
            accessor: 'title'
        }, {
            id: 'date',
            Header: 'Datum',
            accessor: event => new Date(event.date).toLocaleString("de-DE")
        }, {
            Header: 'Ort',
            accessor: 'location',
        }];

        if (this.props.user.isAdmin) {
            columns.push({
                Header: 'Kapazität',
                accessor: 'maxMember'
            });
        }

        columns.push({
            Header: '',
            Cell: rowInfo => {
                const eventId = rowInfo.original.id;
                const showUrl = `events/${eventId}`;
                const editUrl = `events/edit/${eventId}`;

                let adminPart;

                if (this.props.user.isAdmin) {
                    adminPart = (<Link to={editUrl} className="far fa-edit fa-lg default-icon-color no-underline"></Link>);
                }

                return (
                    <div>
                        <Link to={showUrl} className="far fa-file-alt fa-lg default-icon-color mr-2 no-underline"></Link>
                        {adminPart}
                    </div>
                )
            }
        });

        let adminBtn;

        if (this.props.user.isAdmin) {
            adminBtn = (
                <Link
                    to="/events/new"
                    className='btn btn-sm btn-primary mb-4'>
                        Neues Event
                </Link>
            )
        }

        return (
            <div>
                <div className="text-right">
                    {adminBtn}
                </div>

                <ReactTable
                    data={data}
                    columns={columns}
                    minRows={0}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default withRouter(EventsTable);

const fetchRemoteEvents = () => {
	return fetch("http://localhost:3001/api/events");
}
const fetchRemoteEvent = eventId => {
	return fetch(`http://localhost:3001/api/events/${eventId}`);
}

const deleteRemoteEvent = eventId => {
	const request = new Request(`http://localhost:3001/api/events/${eventId}`, {
		method: 'DELETE'
	});

	return fetch(request);
}

const updateRemoteEvent = event => {
	const request = new Request(`http://localhost:3001/api/events/${event.id}`, {
		method: 'PUT',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ ...event })
	});

	return fetch(request);
}

const createRemoteEvent = event => {
  	event.id = undefined;

	const request = new Request("http://localhost:3001/api/events", {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ ...event })
	});

	return fetch(request);
}


export { fetchRemoteEvents, fetchRemoteEvent, deleteRemoteEvent, updateRemoteEvent, createRemoteEvent };

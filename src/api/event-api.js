const getHeader = token => {
	return new Headers({
		authorization: `Bearer ${token}`
	});
}

const fetchRemoteEvents = accessToken => {
	return fetch("https://jku-expressjs-reservation.appspot.com/api/events", {
		headers: getHeader(accessToken),
   		method: 'GET'
	});
}
const fetchRemoteEvent = (eventId, accessToken) => {
	return fetch(`https://jku-expressjs-reservation.appspot.com/api/events/${eventId}`, {
		headers: getHeader(accessToken),
		method: 'GET'
	});
}

const deleteRemoteEvent = (eventId, accessToken) => {
	const request = new Request(`https://jku-expressjs-reservation.appspot.com/api/events/${eventId}`, {
		headers: getHeader(accessToken),
		method: 'DELETE'
	});

	return fetch(request);
}

const updateRemoteEvent = (event, accessToken) => {
	const request = new Request(`https://jku-expressjs-reservation.appspot.com/api/events/${event.id}`, {
		method: 'PUT',
		headers: new Headers({
			'Content-Type': 'application/json',
			authorization: `Bearer ${accessToken}`
		}),
		body: JSON.stringify({ ...event })
	});

	return fetch(request);
}

const createRemoteEvent = (event, accessToken) => {
  	event.id = undefined;

	const request = new Request("https://jku-expressjs-reservation.appspot.com/api/events", {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
			authorization: `Bearer ${accessToken}`
		}),
		body: JSON.stringify({ ...event })
	});

	return fetch(request);
}


export { fetchRemoteEvents, fetchRemoteEvent, deleteRemoteEvent, updateRemoteEvent, createRemoteEvent };

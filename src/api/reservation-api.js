const fetchRemoteReservations = ({eventId, userId}) => {
	let paramsString = [];

	if (eventId) {
		paramsString.push("eventId="+eventId);
	}
	if (userId) {
		paramsString.push("userId="+userId);
	}

	return fetch(`http://localhost:3001/api/registrations?${paramsString.join("&")}`);
}

const deleteRemoteReservation = reservationId => {
	const request = new Request(`http://localhost:3001/api/registrations/${reservationId}`, {
		method: 'DELETE'
	});
	return fetch(request);
}

const makeRemoteReservation = reservation => {
	const request = new Request("http://localhost:3001/api/registrations", {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ ...reservation })
	});

	return fetch(request);
}


export { fetchRemoteReservations, deleteRemoteReservation, makeRemoteReservation };

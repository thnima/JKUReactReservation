const getHeader = token => {
	return new Headers({
		authorization: `Bearer ${token}`
	});
}

const fetchRemoteReservations = ({eventId, userId}, accessToken) => {
	let paramsString = [];

	if (eventId) {
		paramsString.push("eventId="+eventId);
	}
	if (userId) {
		paramsString.push("userId="+userId);
	}

	return fetch(`https://jku-expressjs-reservation.appspot.com/api/registrations?${paramsString.join("&")}`, {
		headers: getHeader(accessToken),
		method: 'GET'
	});
}

const deleteRemoteReservation = (reservationId, accessToken) => {
	const request = new Request(`https://jku-expressjs-reservation.appspot.com/api/registrations/${reservationId}`, {
		headers: getHeader(accessToken),
		method: 'DELETE'
	});
	return fetch(request);
}

const makeRemoteReservation = (reservation, accessToken) => {
	const request = new Request("https://jku-expressjs-reservation.appspot.com/api/registrations", {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
			authorization: `Bearer ${accessToken}`
		}),
		body: JSON.stringify({ ...reservation })
	});

	return fetch(request);
}


export { fetchRemoteReservations, deleteRemoteReservation, makeRemoteReservation };

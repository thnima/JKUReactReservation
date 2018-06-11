const registerUser = user => {
	const request = new Request("http://localhost:3001/api/users", {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ ...user })
	});

	return fetch(request);
}

const fetchRemoteUser = (userId) => {
	return fetch(`http://localhost:3001/api/users/${userId}`);
}

export { registerUser, fetchRemoteUser };

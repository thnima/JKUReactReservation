const fetchRemoteUser = (userId) => {
	return fetch(`https://jku-expressjs-reservation.appspot.com/api/users/${userId}`);
}

export { fetchRemoteUser };

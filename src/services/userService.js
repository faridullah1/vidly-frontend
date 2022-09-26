import http from './httpService';

const endPoint = '/users';

export function register(user) {
	return http.post(endPoint, {
		email: user.username,
		password: user.password,
		name: user.name
	});
}
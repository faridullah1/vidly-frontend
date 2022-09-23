import http from './httpService';
import config from '../config.json';

const endPoint = config.apiUrl + '/users';

export function register(user) {
	return http.post(endPoint, {
		email: user.username,
		password: user.password,
		name: user.name
	});
}
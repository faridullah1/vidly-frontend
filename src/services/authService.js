import http from './httpService';
import config from '../config.json';

const endPoint = config.apiUrl + '/auth';

export function login(email, password) {
	return http.post(endPoint, { email, password });
}
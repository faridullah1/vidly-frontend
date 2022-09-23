import http from './httpService';
import config from '../config.json';

import jwtDecode from 'jwt-decode';

const endPoint = config.apiUrl + '/auth';
const tokenKey = 'token';

export async function login(email, password) {
	const { data: jwt } = await http.post(endPoint, { email, password });
	localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const token = localStorage.getItem(tokenKey);
		return jwtDecode(token);
	} catch (ex) {
		return null
	}
}

const authServiceExports = {
	login,
	logout,
	loginWithJwt,
	getCurrentUser
}

export default authServiceExports;
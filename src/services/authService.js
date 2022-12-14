import http from './httpService';

import jwtDecode from 'jwt-decode';

const endPoint = '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

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

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

const authServiceExports = {
	login,
	logout,
	loginWithJwt,
	getCurrentUser,
	getJwt
}

export default authServiceExports;
import http from './httpService';
import config from '../config.json';

const endPoint = config.apiUrl + '/movies';

function movieUrl(id) {
	return `${endPoint}/${id}`;
}

export function getMovies() {
	return http.get(endPoint);
}

export function deleteMovie(movieId) {
	return http.delete(movieUrl(movieId));
}

export function getMovie(movieId) {
	return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
	const movieId = movie._id;
	if (movieId) {
		delete movie['_id'];
		return http.put(movieUrl(movieId), movie);
	}
	
	return http.post(endPoint, movie);
}
import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './loggerService';

axios.interceptors.response.use(null, error => {
	const expectedError = 	error.response && 
							error.response.status >= 400 && 
							error.response.status < 500;
	if (!expectedError) {
		logger.log(error);
		toast('An Unexpected error occured.');
	}

	return Promise.reject(error);
});

const exportObject = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete
}

export default exportObject;
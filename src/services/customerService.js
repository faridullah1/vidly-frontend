import http from './httpService';

const endPoint = '/customers';

function customerUrl(id) {
	return `${endPoint}/${id}`;
}

export function getCustomers() {
	return http.get(endPoint);
}

export function getCustomer(customerId) {
	return http.get(customerUrl(customerId));
}

export function saveMovie(customer) {
	const customerId = customer._id;
	if (customerId) {
		delete customer['_id'];
		return http.put(customerUrl(customerId), customer);
	}
	
	return http.post(endPoint, customer);
}
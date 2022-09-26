import React from 'react';
import Joi from 'joi-browser';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Form from '../common/form';
import { getCustomer, saveMovie } from '../../services/customerService';


class CustomerFormClass extends Form {
	state = {
		data: {
			name: '',
			phone: '',
			isGold: false,
		},
		errors: {}
	}

	schema = {
		_id: Joi.string(),
		name: Joi.string().required().label('Full Name'),
		phone: Joi.number().required().min(11).max(11).label('Phone'),
		isGold: Joi.bool().required().label('Is Gold')
	}

	async populateCustomer() {
		try {
			const customerId = this.props.params.id;
			if (customerId === 'new') return;

			const { data: customer } = await getCustomer(customerId);
			this.setState({ data: this.mapToViewModel(customer)});
		}
		catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.navigate('/not-found');
			}
		}
	}

	async componentDidMount() {
		await this.populateCustomer();
	}

	mapToViewModel(customer) {
		return {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
			isGold: customer.isGold
		}
	}

	doSubmit = async () => {
		try {
			await saveMovie(this.state.data);
			this.props.navigate('/customers');
		}
		catch (ex) {
			toast.error(ex.response.data);
		}
	}

	render() { 
		return (
			<div>
				<h1>Movie Form</h1>

				<form onSubmit={this.handleSubmit}>
					{ this.renderInput('name', 'Full Name')}
					{ this.renderInput('phone', 'Phone', 'number')}
					{ this.renderInput('isGold', 'Is Gold', 'checkbox')}

					{ this.renderButton('Save') }
				</form>
			</div>
		);
	}
}

// Wrapper around CustomerFormClass, because we can't use useParams hook inside a class component.
const CustomerForm = (props) => {
	const params = useParams();
	const navigate = useNavigate();
  
	return <CustomerFormClass {...props} params={params} navigate={navigate} />;
}

export default CustomerForm;
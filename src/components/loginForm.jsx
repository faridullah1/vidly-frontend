import Joi from 'joi-browser';
import React from 'react';
import Form from './common/form';


class LoginForm extends Form {
	state = {
		data: {
			username: '',
			password: ''
		},
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password')
	}

	doSubmit = () => {
		console.log('Submitted', this.state.data);
	}

	render() {

		return (
			<form onSubmit={ this.handleSubmit }>
				{ this.renderInput('username', 'Username') }
				{ this.renderInput('password', 'Password', 'password') }

				{ this.renderButton('Login') }
			</form>
		);
	}
}
 
export default LoginForm;
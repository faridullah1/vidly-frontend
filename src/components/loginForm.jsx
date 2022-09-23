import Joi from 'joi-browser';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import Form from './common/form';


class LoginFormClass extends Form {
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

	doSubmit = async () => {
		try {
			const { username, password } = this.state.data;
			await login(username, password);
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
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
 
export default function LoginForm(props) {
	const navigate = useNavigate();
	return <LoginFormClass {...props} navigation={navigate} />;
}
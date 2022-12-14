import Joi from 'joi-browser';
import { useNavigate } from 'react-router-dom';

import Form from '../common/form';

import * as userService from '../../services/userService';
import auth from '../../services/authService';

class RegisterFormClass extends Form {
	state = { 
		data: {
			username: '',
			password: '',
			name: ''
		},
		errors: {}
	}

	schema = {
		username: Joi.string().required().email().label('Username'),
		password: Joi.string().required().min(10).label('Password'),
		name: Joi.string().required().label('Name'),
	}

	doSubmit = async () => {
		try {
			const data = await userService.register(this.state.data);
			auth.loginWithJwt(data.headers['x-auth-token']);
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
			<div>
				<h1>Register</h1>

				<form onSubmit={this.handleSubmit}>
					{ this.renderInput('username', 'Username')}
					{ this.renderInput('password', 'Password', 'password')}
					{ this.renderInput('name', 'Name')}

					{ this.renderButton('Register') }
				</form>
			</div>
		);
	}
}
 
export default function RegisterForm(props) {
	const navigate = useNavigate();
	return <RegisterFormClass {...props} navigation={navigate} />;
}
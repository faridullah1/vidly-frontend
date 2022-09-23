import Form from './common/form';
import Joi from 'joi-browser';
import * as userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

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
			localStorage.setItem('token', data.headers['x-auth-token']);
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
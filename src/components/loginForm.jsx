import React, { Component } from 'react';

class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: ''
		}
	};

	userName = React.createRef();

	componentDidMount() {
		this.userName.current.focus();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
	}

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	}

	render() {
		const { account } = this.state;

		return (
			<form onSubmit={ this.handleSubmit }>
				<div className="form-group">
					<label>Username</label>
					<input 
						value={ account.username } 
						onChange = { this.handleChange }
						name="username"
						ref={ this.userName } 
						type="text" 
						className="form-control" />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input 
						value={ account.password } 
						onChange = { this.handleChange }
						name="password"
						type="password" 
						className="form-control" />
				</div>

				<button className='btn btn-primary mt-3'>Login</button>
			</form>
		);
	}
}
 
export default LoginForm;
import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import CustomersComponent from './components/customers';
import MoviesComponent from './components/movies';
import NavBar from './components/navBar';
import NotFound from './components/not-found';
import RentalsComponent from './components/rentals';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registrationForm';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	state = {
		user: null
	}

	componentDidMount() {
		try {
			const token = localStorage.getItem('token');
			const user = jwtDecode(token);
			this.setState({ user });
		} catch (ex) { }
	}

	render() { 
		return (
			<div>
				<ToastContainer />
				
				<NavBar user={this.state.user}/>

				<main className='container'>
					<Routes>
						<Route path='/' element={<MoviesComponent />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
						<Route path='/register' element={<RegisterForm />}></Route>
						<Route path='/movies/:id' element={<MovieForm />}></Route>
						<Route path='/movies' element={<MoviesComponent />}></Route>
						<Route path='/customers' element={<CustomersComponent />}></Route>
						<Route path='/rentals' element={<RentalsComponent />}></Route>
						<Route path='/not-found' element={<NotFound />}></Route>
						<Route path="*" element={<Navigate to="/not-found" replace />}/>
					</Routes>
				</main>
			</div>
		);
	}
}

export default App;

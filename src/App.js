import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CustomersComponent from './components/customers';
import MoviesComponent from './components/movies';
import NavBar from './components/navBar';
import NotFound from './components/not-found';
import RentalsComponent from './components/rentals';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registrationForm';

import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	state = { user: null }

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() { 
		return (
			<div>
				<ToastContainer />
				
				<NavBar user={this.state.user}/>

				<main className='container'>
					<Routes>
						<Route path='/' element={<MoviesComponent user={this.state.user}/>}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
						<Route path='/logout' element={<Logout />}></Route>
						<Route path='/register' element={<RegisterForm />}></Route>
						<Route path='/movies/:id' element={<MovieForm />}></Route>
						<Route path='/movies' element={<MoviesComponent user={this.state.user}/>}></Route>
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

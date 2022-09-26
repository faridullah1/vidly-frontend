// Core modules
import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import NavBar from './components/navBar';
import NotFound from './components/not-found';
import RentalsComponent from './components/rentals';
import MoviesComponent from './components/movie/movies';
import MovieForm from './components/movie/movieForm';
import LoginForm from './components/auth/loginForm';
import Logout from './components/auth/logout';
import RegisterForm from './components/auth/registrationForm';
import CustomersComponent from './components/customer/customers';

// Services
import auth from './services/authService';

// Styles
import './App.css';


class App extends Component {
	state = { user: null }

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<div>
				<ToastContainer />
				
				<NavBar user={this.state.user}/>

				<main className='container'>
					<Routes>
						<Route path='/' element={<MoviesComponent user={user}/>}></Route>
						<Route path='/login' element={!user ? <LoginForm /> : <Navigate replace to={"/"} /> }></Route>
						<Route path='/logout' element={<Logout />}></Route>
						<Route path='/register' element={!user ? <RegisterForm /> : <Navigate replace to={"/"} /> }></Route>
						<Route path='/movies/:id' element={ user ? <MovieForm /> : <Navigate replace to={"/login"} /> }></Route>
						<Route path='/movies' element={<MoviesComponent user={user}/>}></Route>
						<Route path='/customers' element={<CustomersComponent user={user} />}></Route>
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

import { Route, Routes, Navigate } from 'react-router-dom';
import CustomersComponent from './components/customers';
import MoviesComponent from './components/movies';
import NavBar from './components/navBar';
import NotFound from './components/not-found';
import RentalsComponent from './components/rentals';
import './App.css';
import MovieForm from './components/movieForm';


function App() {
	return (
		<div>
			<NavBar></NavBar>

			<main className='container'>
				<Routes>
					<Route path='/' element={<MoviesComponent />}></Route>
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

export default App;

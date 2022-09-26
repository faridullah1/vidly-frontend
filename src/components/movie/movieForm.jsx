import React from 'react';
import Joi from 'joi-browser';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Form from '../common/form';
import { getGenres } from '../../services/genreService';
import { getMovie, saveMovie } from '../../services/movieService';


class MovieFormClass extends Form {
	state = {
		data: {
			title: '',
			genreId: '',
			numberInStock: '',
			dailyRentalRate: '',
		},
		genres: [],
		errors: {}
	}

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().required().min(0).max(100).label('Number In Stock'),
		dailyRentalRate: Joi.number().required().min(0).max(100).label('Daily Rental Rate')
	}

	async populateGenre() {
		const { data } = await getGenres();
		this.setState({ genres: data });
	}

	async populateMovie() {
		try {
			const movieId = this.props.params.id;
			if (movieId === 'new') return;

			const { data: movie } = await getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie)});
		}
		catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.navigate('/not-found');
			}
		}
	}

	async componentDidMount() {
		await this.populateGenre();
		await this.populateMovie();
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		}
	}

	doSubmit = async () => {
		try {
			await saveMovie(this.state.data);
			this.props.navigate('/movies');
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
					{ this.renderInput('title', 'Title')}
					{ this.renderSelect('genreId', 'Genre', this.state.genres)}
					{ this.renderInput('numberInStock', 'Stock', 'number')}
					{ this.renderInput('dailyRentalRate', 'Rate', 'number')}

					{ this.renderButton('Save') }
				</form>
			</div>
		);
	}
}

// Wrapper around movieFormClass, because we can't use useParams hook inside a class component.
const MovieForm = (props) => {
	const params = useParams();
	const navigate = useNavigate();
  
	return <MovieFormClass {...props} params={params} navigate={navigate} />;
}

export default MovieForm;
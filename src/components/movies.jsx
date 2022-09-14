import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';


class MovieComponent extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3, 
		currentPage: 1,
		selectedGenre: null
	}

	componentDidMount() {
		const genres = [{ name: 'All Genres'}, ...getGenres()];
		
		this.setState({
			movies: getMovies(), genres
		});
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);

		this.setState({
			movies
		});
	}

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;

		this.setState({ movies });
	}

	handlePageChange = (page) => {
		this.setState({
			currentPage: page
		});
	}

	handleGenreSelect = genre => {
		this.setState({
			selectedGenre: genre, currentPage: 1
		});
	}

	render() {
		const { pageSize, currentPage, movies: allMOvies, selectedGenre } = this.state;

		const filtered = selectedGenre && selectedGenre._id ? allMOvies.filter(m => m.genre._id === selectedGenre._id) : allMOvies;
		const movies = paginate(filtered, currentPage, pageSize);

		if (filtered.length === 0) return <p>There are no movies in the database!</p>

		return (
			<div className='row'>
				<div className="col-2">
					<ListGroup 
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}/>
				</div>

				<div className="col">
					<p> Showing { filtered.length } movies in the database</p>

					<MoviesTable movies={movies} onLike={this.handleLike} onDelete={this.handleDelete}/>

					<Pagination 
						totalItems={filtered.length} 
						pageSize={pageSize}
						currentPage={currentPage}

						onPageChange={this.handlePageChange}/>
				</div>
			</div>
		);
	}
}
 
export default MovieComponent;
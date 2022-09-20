import React, { Component } from 'react';
import { deleteMovie, getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';


class MoviesComponent extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3, 
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' },
		selectedGenre: null
	}

	componentDidMount() {
		const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
		
		this.setState({
			movies: getMovies(), genres
		});
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);

		this.setState({
			movies
		});
		
		deleteMovie(movie._id);
	}

	handleLike = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;

		this.setState({ movies });
	}

	handleSort = sortColumn => {	
		this.setState({ sortColumn });
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

	getPagedData = () => {
		const { pageSize, currentPage, sortColumn, movies: allMOvies, selectedGenre } = this.state;

		// 1. Filtering
		const filtered = selectedGenre && selectedGenre._id ? allMOvies.filter(m => m.genre._id === selectedGenre._id) : allMOvies;
		
		// 2. Sorting
		const sorted = _.sortBy(filtered, [sortColumn.path], [sortColumn.order]);

		// 3. Pagination
		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCounts: filtered.length, data: movies };
	}

	render() {
		const { pageSize, currentPage, sortColumn } = this.state;

		const { totalCounts, data: movies } = this.getPagedData();

		return (
			<div className='row'>
				<div className="col-2">
					<ListGroup 
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}/>
				</div>

				<div className="col">
					{totalCounts === 0 && <p>There are no movies in the database!</p>}

					{totalCounts > 0 && <div>
						<Link className="btn btn-primary mb-3" to="/movies/new">New Movie</Link>

						<p> Showing { totalCounts } movies in the database</p>

						<MoviesTable 
							movies={movies}
							sortColumn={sortColumn}

							onLike={this.handleLike} 
							onDelete={this.handleDelete}
							onSort={this.handleSort}
							/>

						<Pagination 
							totalItems={totalCounts} 
							pageSize={pageSize}
							currentPage={currentPage}

							onPageChange={this.handlePageChange}/>
					</div>}
				</div>
			</div>
		);
	}
}
 
export default MoviesComponent;
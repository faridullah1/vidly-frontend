import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import Like from './common/like';
import Pagination from './common/pagination';


class MovieComponent extends Component {
	state = {
		movies: getMovies(),
		pageSize: 2, 
		currentPage: 1
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

	render() {
		const { length: count } = this.state.movies; 
		const { pageSize, currentPage, movies: allMOvies } = this.state;

		const movies = paginate(allMOvies, currentPage, pageSize);

		if (count === 0) return <p>There are no movies in the database!</p>

		return (
			<div>
				<p> Showing { count } movies in the database</p>

				<table className="table">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
							<th scope='col'></th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{ movies.map(m => (
							<tr key={ m._id }>
								<td> { m.title } </td>
								<td> { m.genre.name } </td>
								<td> { m.numberInStock } </td>
								<td> { m.dailyRentalRate } </td>

								<td>
									<Like liked={m.liked} onClick={() => this.handleLike(m)}/>
								</td>

								<td> <button className='btn btn-danger btn-sm' onClick={() => this.handleDelete(m)}>Delete</button> </td>
							</tr> )
						)}
					</tbody>
				</table>

				<Pagination 
					totalItems={count} 
					pageSize={pageSize}
					currentPage={currentPage}

					onPageChange={this.handlePageChange}/>
			</div>
		);
	}
}
 
export default MovieComponent;
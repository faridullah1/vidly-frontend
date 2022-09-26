import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Like from "../common/like";
import Table from '../common/table';
import auth from '../../services/authService';

class MoviesTable extends Component {
	state = {
		columns: [
			{ path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
			{ path: 'genre.name', label: 'Genre' },
			{ path: 'numberInStock', label: 'Stock' },
			{ path: 'dailyRentalRate', label: 'Rate' },
			{ key: 'like', content: (movie) => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>}
		]
	}

	constructor() {
		super();

		const user = auth.getCurrentUser();
		if (user && user.isAdmin) {
			this.state.columns.push(this.deleteColumn);
		}
	}

	deleteColumn = { 
		key: 'delete', 
		content: (movie) => <button className='btn btn-danger btn-sm' onClick={() => this.props.onDelete(movie)}>Delete</button>
	}

	render() { 
		const { movies, onSort, sortColumn } = this.props;

		return (
			<Table data={movies} columns={this.state.columns} onSort={onSort} sortColumn={sortColumn}/>
		);
	}
}
 
export default MoviesTable;
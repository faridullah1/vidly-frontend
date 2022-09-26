import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../services/authService';
import Table from '../common/table';

class CustomersTable extends Component {
	state = {
		columns: [
			{ path: 'name', label: 'Full Name', content: customer => <Link to={`/movies/${customer._id}`}>{customer.name}</Link> },
			{ path: 'phone', label: 'Phone' },
			{ path: 'isGold', label: 'Is Gold' },
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
		const { customers, onSort, sortColumn } = this.props;

		return (
			<Table data={customers} columns={this.state.columns} onSort={onSort} sortColumn={sortColumn}/>
		);
	}
}
 
export default CustomersTable;
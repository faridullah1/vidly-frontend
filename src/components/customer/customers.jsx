import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { paginate } from '../../utils/paginate'
import CustomersTable from './customersTable';
import Pagination from '../common/pagination';

import { getCustomers } from '../../services/customerService';


class CustomersComponent extends Component {
	state = {
		customers: [],
		pageSize: 3, 
		currentPage: 1,
		sortColumn: { path: 'name', order: 'asc' },
	}

	async componentDidMount() {
		const { data: customers } = await getCustomers();
		this.setState({ customers });
	}

	handleSort = sortColumn => {	
		this.setState({ sortColumn });
	}

	handlePageChange = (page) => {
		this.setState({
			currentPage: page
		});
	}

	getPagedData = () => {
		const { pageSize, currentPage, sortColumn, customers: AllCustomers } = this.state;

		// 2. Sorting
		const sorted = _.sortBy(AllCustomers, [sortColumn.path], [sortColumn.order]);

		// 3. Pagination
		const customers = paginate(sorted, currentPage, pageSize);

		return { totalCounts: AllCustomers.length, data: customers };
	}

	render() {
		const { pageSize, currentPage, sortColumn } = this.state;
		const { totalCounts, data: customers } = this.getPagedData();
		const { user } = this.props;

		return (
			<div className='row'>
				<div className="col">
					{ user && <Link className="btn btn-primary mb-3" to="/movies/new">New Customer</Link>}
					{ totalCounts === 0 && <p>There are no customers in the database!</p> }
					{ totalCounts > 0 && <div>
						<p> Showing { totalCounts } customers in the database</p>

						<CustomersTable 
							customers={customers}
							sortColumn={sortColumn}

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
 
export default CustomersComponent;
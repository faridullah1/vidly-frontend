import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
	const { totalItems, pageSize, currentPage, onPageChange } = props;

	const pagesCount = Math.ceil(totalItems / pageSize);
	if (pagesCount === 1) return null;

	const pages = _.range(1, pagesCount + 1);

	return ( 
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				{ pages.map(page => (
					<li key={page} className={ page === currentPage ? 'page-item active' : 'page-item' }>
						<Link className="page-link" onClick={() => onPageChange(page)} to="/movies">{ page }</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

Pagination.propTypes = {
	totalItems: PropTypes.number.isRequired, 
	pageSize: PropTypes.number.isRequired, 
	currentPage: PropTypes.number.isRequired, 
	onPageChange: PropTypes.func.isRequired
}
 
export default Pagination;
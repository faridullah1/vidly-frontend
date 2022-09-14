import React from 'react';
import _ from 'lodash';

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
						<a className="page-link" onClick={() => onPageChange(page)} href="/#">{ page }</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
 
export default Pagination;
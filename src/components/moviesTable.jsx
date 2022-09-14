import Like from "./common/like";

const MoviesTable = (props) => {
	const { movies, onLike, onDelete } = props;
	return (
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
							<Like liked={m.liked} onClick={() => onLike(m)}/>
						</td>

						<td> <button className='btn btn-danger btn-sm' onClick={() => onDelete(m)}>Delete</button> </td>
					</tr> )
				)}
			</tbody>
		</table>
	);
}
 
export default MoviesTable;
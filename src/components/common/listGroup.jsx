const ListGroup = (props) => {
	const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;

	return ( 
		<ul className="list-group">
			{ items.map(item => 
				<li className={selectedItem === item ? 'list-group-item active' : 'list-group-item'} 
					style={{ cursor: 'pointer' }}
					key={item[valueProperty]} 
					onClick={() => onItemSelect(item)}>{ item[textProperty] }
				</li>
			)}
		</ul>
	 );
}
 
ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id'
};

export default ListGroup;
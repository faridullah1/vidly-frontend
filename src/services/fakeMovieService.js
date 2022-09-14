const movies = [
	{
		_id: "62188020f5bfa29914a13b22",
		title: 'Terminator',
		genre: { _id: "62188020f5bfa29914a13b1e", name: 'Action' },
		numberInStock: 6,
		dailyRentalRate: 100,
		liked: true
	},
	{
		_id: "62188020f5bfa29914a1cu22",
		title: 'Die Hard',
		genre: { _id: "62188020f5bfa29914a13b1e", name: 'Action' },
		numberInStock: 2,
		dailyRentalRate: 150
	},
	{
		_id: "62188020f5bfa29914adbb22",
		title: '3 Idios',
		genre: { _id: "62188020f5bfa29914a13b1e", name: 'Action' },
		numberInStock: 20,
		dailyRentalRate: 80
	}
];

export function getMovies() {
	return movies;
}

export function getMovie(id) {
	return movies.find(m => m._id === id);
}
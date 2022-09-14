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
	},
	{
		_id: "62188020f5bfa29914adbbdi",
		title: 'Airplane',
		genre: { _id: "621886d16878da7fb4b13415", name: 'Thriller' },
		numberInStock: 3,
		dailyRentalRate: 129
	},
	{
		_id: "62188020f5bfa29914aasb22",
		title: 'Wedding crashes',
		genre: { _id: "621886d16878da7fb4b13415", name: 'Thriller' },
		numberInStock: 9,
		dailyRentalRate: 30
	}
];

export function getMovies() {
	return movies;
}

export function getMovie(id) {
	return movies.find(m => m._id === id);
}
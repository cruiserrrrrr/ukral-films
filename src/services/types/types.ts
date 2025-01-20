interface ISearchElem {
	id: number;
	type: string;
	title: {
		russian: string;
		original: string;
	};
	posterUrl: string;
	year: number;
	rating: {
		kinopoisk: {
			value: number;
			count: number;
		};
		imdb: {
			value: number;
			count: number;
		};
	};
	countries: {
		id: number;
		name: string;
		position: number;
	}[];
	genres: {
		id: number;
		name: string;
		slug: string;
		position: number;
	}[];
	description: string;
}
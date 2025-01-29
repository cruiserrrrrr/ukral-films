'use client';

import styles from './index.module.scss';
import { ChangeEvent, useState } from 'react';
import { searchRequest } from '@/services/api/kbox';
import { useRouter } from 'next/navigation';
import FilmsList from '@/shared/components/FilmsList';

interface ISearch {
	films: ISearchElem[];
	searchQuery: string;
	page?: string;
}

const Search = (props: ISearch) => {
	const { searchQuery, films = [], page = '' } = props;
	const [value, setValue] = useState<string>(searchQuery || '');
	const [filmsList, setFilmsList] = useState<ISearchElem[]>(films);
	const router = useRouter();
	
	
	const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!value) return;
		const newFilms = await searchRequest(value);
		if (!!newFilms.data.films.length) {
			setFilmsList(newFilms.data.films);
			router.replace(`/search?search=${value}&page=${page || 1}`);
		}
	};
	
	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<h1 className={styles.title}>Результаты поиска по запросу: {searchQuery}</h1>
				<form className={styles.search} onSubmit={handleSearch}>
					<input
						className={styles.input}
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder={'Search'}
					/>
					<button type={'submit'} className={styles.button}>Search</button>
				</form>
				<FilmsList films={filmsList} />
			</div>
		</div>
	);
};

export default Search;
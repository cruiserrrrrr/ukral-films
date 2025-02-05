'use client';

import styles from './index.module.scss';
import { MultiSelect, Pagination, Title } from '@mantine/core';
import FilmsList from '@/shared/components/FilmsList';
import filtersData from '@/shared/data/filters/filters.json';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IFilms {
	films: ISearchElem[];
	totalPages: number;
	currentPage: string;
}

const Films = (props: IFilms) => {
	const { films, totalPages, currentPage = 1 } = props;
	const [a, setA] = useState<string[] | null>([]);
	const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
	const [selectedYears, setSelectedYears] = useState<string[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
	const router = useRouter();
	
	
	const handlePush = (page: number) => {
		router.push(`/films?page=${page}`);
	};
	
	const handleSelectCountry = (country: string[]) => {
		const searchString = country.join('-');
	};
	const handleSelectYears = (years: string[]) => {
		const searchString = years.join('-');
	};
	const handleSelectGenre = (genre: string[]) => {
		const searchString = genre.join('-');
	};
	
	return (
		<div className={styles.container}>
			<Title order={1}>Фильмы</Title>
			<div className={styles.filters}>
				<MultiSelect
					label={'Страна'}
					className={styles.select}
					data={filtersData.country.map((f) => f.name)}
					onChange={setSelectedCountry}
				/>
				<MultiSelect
					label={'Год'}
					className={styles.select}
					data={filtersData.year.map((f) => f.label)}
					onChange={setSelectedYears}
				/>
				<MultiSelect
					label={'Жанр'}
					className={styles.select}
					data={filtersData.genre.map((f) => f.label)}
					onChange={setSelectedGenre}
				/>
			</div>
			<FilmsList films={films} />
			<Pagination
				total={totalPages}
				onChange={handlePush}
				value={Number(currentPage)}
			/>
		</div>
	);
};

export default Films;
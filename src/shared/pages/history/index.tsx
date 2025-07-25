'use client';

import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { filmsList } from '@/services/redux/slices/history/history';
import FilmsList from '@/shared/components/FilmsList';
import { Title } from '@mantine/core';

const History = () => {
	
	const films = useSelector(filmsList);
	return (
		<div className={`container ${styles.history}`}>
			<Title order={1}>История просмотров</Title>
			{films.length ? (
				<FilmsList films={films} isHistory />
			) : (
				<p>История пуста</p>
			)}
		</div>
	);
};

export default History;
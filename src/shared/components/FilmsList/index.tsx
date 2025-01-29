import styles from './index.module.scss';
import FilmCard from '@/shared/components/FilmCard';

interface IList {
	films: ISearchElem[];
}

const FilmsList = (props: IList) => {
	const { films } = props;
	return (
		<div className={styles.list}>
			{films.map((film: ISearchElem, index: number) => (
				<FilmCard card={film} key={index + film.title.original} />
			))}
		</div>
	);
};

export default FilmsList;
'use client';
import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import noPhoto from '@public/images/no_photo.png';

interface IFilmCard {
	card: ISearchElem;
}

const FilmCard = (props: IFilmCard) => {
	
	const { card } = props;
	if (!card.posterUrl) return null;
	return (
		<Link href={`/detail/${card.id}`} className={styles.card}>
			<Image
				className={styles.poster}
				src={card.posterUrl || noPhoto}
				alt={`Image for ${card.title.original}`}
				width={250}
				height={250}
			/>
			<div className={styles.info}>
				<p className={styles.name}>{card.title.russian || card.title.original || ''}</p>
			</div>
		</Link>
	);
};

export default FilmCard;
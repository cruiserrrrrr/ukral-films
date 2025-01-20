"use client";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";

interface IFilmCard {
	card: ISearchElem;
}

const FilmCard = (props: IFilmCard) => {

	const {card} = props;

	return (
		<Link href={`/detail/${card.id}`} className={styles.card}>
			<Image
				className={styles.poster}
				src={card.posterUrl}
				alt={`Image for ${card.title.original}`}
				width={250}
				height={250}
			/>
			<div className={styles.info}>
				<p className={styles.name}>{card.title.original}</p>
			</div>
		</Link>
	)
}

export default FilmCard;
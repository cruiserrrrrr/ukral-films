import styles from './index.module.scss';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Player from '@/shared/components/player';

interface IDetail {
	card: ISearchElem;
}

const Detail = (props: IDetail) => {
	const { card } = props;
	console.log(card, 'card');
	if (!card) return notFound();
	return (
		<div className={styles.wrapper}>
			<div className={styles.head}>
				{card.posterUrl ? (
					<Image
						src={card.posterUrl}
						alt={card.title.original}
						width={1000}
						height={1000}
						className={styles.poster}
					/>
				) : null}
				<div className={styles.info}>
					<h1 className={styles.title}>{card.title.original}</h1>
					<p>{card.description}</p>
				</div>
			</div>
			<Player id={card.id}/>
		</div>
	);
};

export default Detail;
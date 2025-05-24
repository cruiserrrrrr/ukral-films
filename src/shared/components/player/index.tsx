'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface IPlayer {
	id: string;
}

const Player = (props: IPlayer) => {
	
	const { id } = props;
	
	const [value, setValue] = useState<string>(id);
	
	const containerRef = useRef(null);
  
  useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://kinobox.tv/kinobox.min.js';
		script.async = true;
		document.body.appendChild(script);
		
		script.onload = () => {
			if (containerRef.current) {
				// @ts-ignore
				new Kinobox('.kinobox_player', { search: { query: value } }).init()
				// (window as any).kbox(containerRef.current, {
				// 	search: { kinopoisk: '1381125' },
				// 	menu: {
				// 		enabled: true,
				// 	},
				// });
			}
		};
		
		return () => {
			try {
				document.body.removeChild(script);
			} catch (e) {
			}
		};
	}, [value]);
	
	return (
		<div>
			<div className={`kinobox_player ${styles.player}`} ref={containerRef}></div>
		</div>
	);
};

export default Player;
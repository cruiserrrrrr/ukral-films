'use client';

import styles from './index.module.scss';
import { List, Title } from '@mantine/core';

const About = () => {
	return (
		<div className={styles.about}>
			<div className={styles.container}>
				<Title order={1}>Обращение к пользователям</Title>
				{/*<h1 className={styles.title}>Обращение к пользователям</h1>*/}
				<p className={styles.text}>
					Данный сайт создан исключительно в демонстрационных и образовательных целях. Мы не несем ответственности за содержимое, получаемое через API Kinobox,
					а
					также за его использование пользователями.
				</p>
				<Title order={2}>Отказ от ответственности</Title>
				<List listStyleType="numeric" className={styles.primary_list}>
					<List.Item className={styles.primary_item}>
						Отсутствие коммерческой выгоды
						<List withPadding listStyleType="none">
							<List.Item className={styles.second_item}>
								Владелец сайта не использует его для извлечения прибыли, продажи контента или иного коммерческого обогащения.
							</List.Item>
						</List>
					</List.Item>
					<List.Item className={styles.primary_item}>
						Авторские права
						<List withPadding listStyleType="none">
							<List.Item className={styles.second_item}>
								Весь контент, доступный через данный сайт, предоставляется сторонним сервисом Kinobox. Владелец сайта не хранит, не распространяет и не
								изменяет данные, нарушающие авторские права.
							</List.Item>
						</List>
					</List.Item>
					<List.Item className={styles.primary_item}>
						Третьи лица
						<List withPadding listStyleType="none">
							<List.Item className={styles.second_item}>
								Вся информация предоставляется "как есть". Владелец сайта не контролирует достоверность, актуальность и легальность материалов,
								получаемых через API Kinobox.
							</List.Item>
						</List>
					</List.Item>
					<List.Item className={styles.primary_item}>
						Использование API
						<List withPadding listStyleType="none">
							<List.Item className={styles.second_item}>
								Этот сайт использует API Kinobox только для демонстрационных целей и не является официальным партнером или представителем данного
								сервиса.
							</List.Item>
						</List>
					</List.Item>
					<List.Item className={styles.primary_item}>
						Ответственность пользователей
						<List withPadding listStyleType="none">
							<List.Item className={styles.second_item}>
								Пользователи самостоятельно несут ответственность за использование информации с сайта, а также за соблюдение законодательства своей
								страны.
							</List.Item>
						</List>
					</List.Item>
				</List>
			</div>
		</div>
	);
};

export default About;
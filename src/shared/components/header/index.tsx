'use client';

import styles from './index.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchModal from '@/shared/components/searchModal';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Burger, Drawer } from '@mantine/core';

const Header = () => {
	const [isSticky, setIsSticky] = useState<boolean>(false);
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
	const [opened, { open, close }] = useDisclosure(false);
	
	const isMobile = useMediaQuery('(max-width: 768px)');
	
	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 80);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	
	return (
		<header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
			<div className={styles.wrap}>
				<Link href={'/'} className={styles.logo}>Ukral films</Link>
				{!isMobile ? (
					<nav className={styles.nav}>
						<button className={styles.nav_link} onClick={() => setIsSearchOpen(true)}>Поиск</button>
						<Link href={'/catalog'} className={styles.nav_link}>Главная</Link>
						<Link href={'/about'} className={styles.nav_link}>О нас</Link>
						<Link href={'/random-film'} className={styles.nav_link}>Случайный фильм</Link>
						<Link href={'/cabinet'} className={styles.nav_link}>Личный кабинет</Link>
					</nav>
				) : (
					<Burger onClick={open}/>
				)}
				<SearchModal
					isOpen={isSearchOpen}
					onClose={() => setIsSearchOpen(false)}
				/>
			</div>
			<Drawer opened={opened} onClose={close} title="Ukral films">
				<nav className={styles.nav}>
					<button className={styles.nav_link} onClick={() => setIsSearchOpen(true)}>Поиск</button>
					<Link href={'/catalog'} className={styles.nav_link}>Главная</Link>
					<Link href={'/about'} className={styles.nav_link}>О нас</Link>
					<Link href={'/random-film'} className={styles.nav_link}>Случайный фильм</Link>
					<Link href={'/cabinet'} className={styles.nav_link}>Личный кабинет</Link>
				</nav>
			</Drawer>
		</header>
	);
};

export default Header;

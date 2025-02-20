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
	
	const openSearch = () => setIsSearchOpen(true)
	
	return (
		<header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
			<div className={styles.wrap}>
				<Link href={'/'} className={styles.logo}>Ukral films</Link>
				{!isMobile ? (
					<nav className={styles.nav}>
						<button className={styles.nav_link} onClick={openSearch}>Поиск</button>
						<Link href={'/films'} className={styles.nav_link}>Фильмы</Link>
						<Link href={'/history'} className={styles.nav_link}>История</Link>
						<Link href={'/about'} className={styles.nav_link}>О нас</Link>
					</nav>
				) : (
					<Burger onClick={open} color={"black"} className={styles.burger}/>
				)}
				<SearchModal
					isOpen={isSearchOpen}
					onClose={() => {
						setIsSearchOpen(false);
						close();
					}}
				/>
			</div>
			<Drawer opened={opened} onClose={close} title="Ukral films" zIndex={501}>
				<nav className={styles.nav}>
					<button className={styles.nav_link} onClick={openSearch}>Поиск</button>
					<Link href={'/films'} className={styles.nav_link} onClick={close}>Фильмы</Link>
					<Link href={'/about'} className={styles.nav_link} onClick={close}>О нас</Link>
					<Link href={'/history'} className={styles.nav_link} onClick={close}>История</Link>
				</nav>
			</Drawer>
		</header>
	);
};

export default Header;

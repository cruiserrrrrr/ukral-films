import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Script from 'next/script';
import Header from '@/shared/components/header';
import { CustomProvider } from '@/shared/components/CustomProvider';
import { defaultMetadata } from '@/shared/data/metadata';
import { Analytics } from '@vercel/analytics/react';

const interSans = Inter({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	...defaultMetadata,
};

interface IRootLayout {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayout>) {
	return (
		<html lang="ru">
		<body className={`${interSans.variable}`}>
		<CustomProvider>
			<Header />
			{children}
		</CustomProvider>
		<Analytics />
		<Script strategy={'beforeInteractive'} src="https://kinobox.tv/kinobox.min.js" />
		</body>
		</html>
	);
}

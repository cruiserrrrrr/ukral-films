import About from '@/shared/pages/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Информация о сервисе Urkal Films',
	description: 'Подробная информация о сервисе Urkal Films.',
	openGraph: {
		title: 'Информация о сервисе Urkal Films',
		description: 'Подробная информация о сервисе Urkal Films.',
	},
};

export default async function Page() {
	return <About />;
}
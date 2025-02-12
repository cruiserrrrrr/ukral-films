import type { Metadata } from 'next';
import { defaultMetadata } from '@/shared/data/metadata';
import History from '@/shared/pages/history';

export const metadata: Metadata = {
	...defaultMetadata,
};

export default async function Page() {
	
	return (
		<History />
	);
}
import Films from '@/shared/pages/films';
import { getFilmsList } from '@/services/api/kbox';
import type { Metadata } from 'next';
import { defaultMetadata } from '@/shared/data/metadata';

export const metadata: Metadata = {
	...defaultMetadata,
};

export default async function Page({ params, searchParams }: any) {
	const { page } = await searchParams;
	const filmsData = await getFilmsList(page);
	const films = filmsData.data ? filmsData.data.films : [];
	const totalPages = filmsData.data.total / 50;
	return <Films
		films={films}
		totalPages={totalPages}
		currentPage={page}
	/>;
}
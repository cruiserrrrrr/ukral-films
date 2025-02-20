import { searchRequest } from '@/services/api/kbox';
import Search from '@/shared/pages/search/search';

const empty = {
	data: {
		films: [],
	},
};

export async function generateMetadata({ searchParams }: any) {
	const { search, page = '' } = await searchParams;
	const searchInfo = search ? await searchRequest(search) : empty;
	const films = searchInfo.error ? [] : searchInfo.data.films;
	
	return {
		title: `Результаты поиска по запросу: ${search}.`,
		description: `По результатам запроса: , найдено ${films.length} фильма. ${page > 1 ? `Страница - ${page}` : ''}`,
		openGraph: {
			title: `Результаты поиска по запросу: ${search}.`,
			description: `По результатам запроса: , найдено ${films.length} фильма. ${page > 1 ? `Страница - ${page}` : ''}`,
		},
	};
}

export default async function Page({ params, searchParams }: any) {
	const { search, page = '' } = await searchParams;
	const searchInfo = search ? await searchRequest(search) : empty;
	const films = searchInfo.error ? [] : searchInfo.data.films;
	console.log(searchInfo, 'searchInfo');
	return (
		<div>
			<Search
				films={films}
				searchQuery={search}
				page={page}
				error={searchInfo.error}
			/>
		</div>
	);
}
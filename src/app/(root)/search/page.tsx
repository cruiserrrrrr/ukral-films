import { searchRequest } from '@/services/api/kbox';
import Search from '@/shared/components/search/search';
import { notifications } from '@mantine/notifications';

const empty = {
	data: {
		films: [],
	},
};

export default async function Page({ params, searchParams }: any) {
	const { search, page = '' } = await searchParams;
	const searchInfo = search ? await searchRequest(search) : empty;
	const films = searchInfo.error ? [] : searchInfo.data.films;
	console.log(searchInfo, 'searchInfo')
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
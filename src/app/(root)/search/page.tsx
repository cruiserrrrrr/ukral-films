import { searchRequest } from '@/services/api/kbox';
import Search from '@/shared/components/search/search';

const empty = {
	data: {
		films: [],
	},
};

export default async function Page({ params, searchParams }: any) {
	const { search, page = '' } = await searchParams;
	const searchInfo = search ? await searchRequest(search) : empty;
	console.log(searchInfo, 'searchInfo');
	return (
		<div>
			<Search
				films={searchInfo.data.films || []}
				searchQuery={search}
				page={page}
			/>
		</div>
	);
}
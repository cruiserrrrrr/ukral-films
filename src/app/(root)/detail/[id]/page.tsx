import { getFilmDetail, searchRequest } from '@/services/api/kbox';
import Detail from "@/shared/pages/detail";

interface IInfo {
	data: ISearchElem;
}

export default async function Page({params}: any) {
	const {id} = await params
	const info: IInfo = await getFilmDetail(id);
	const card = info.data;
	const subCards = card.title.original ? await searchRequest(card.title.original) : [];
	console.log(subCards, 'subCards')
	return (
		<Detail card={card} subCards={subCards.data.films || []}/>
	)
}
import {getFilmDetail} from "@/services/api/kbox";
import Detail from "@/shared/pages/detail";

interface IInfo {
	data: ISearchElem;
}

export default async function Page({params}: any) {
	const {id} = await params
	const info: IInfo = await getFilmDetail(id);
	const card = info.data;
	return (
		<Detail card={card}/>
	)
}
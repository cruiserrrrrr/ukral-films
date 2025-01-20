import {getFilmDetail, searchRequest} from "@/services/api/kbox";
import Image from "next/image";
import Detail from "@/shared/pages/detail";

// import {useEffect} from "react";

interface IInfo {
	data: ISearchElem;
}

export default async function Page({params}: any) {
	const {id} = await params
	const info: IInfo = await getFilmDetail(id);
	// search/?query=star%20wars
	const card = info.data;
	return (
		<Detail card={card}/>
	)
}
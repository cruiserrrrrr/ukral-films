import {getFilmDetail, searchRequest} from "@/services/api/kbox";
import {notFound} from "next/navigation";
import * as sea from "node:sea";
import FilmCard from "@/shared/components/FilmCard";
import Search from "@/shared/components/search/search";

export default async function Page({params, searchParams}: any) {
	const {search} = await searchParams;
	if (!search) return notFound();
	const searchInfo = await searchRequest(search)
	console.log(searchInfo, 'searchInfo')
	return (
		<div>
			<Search films={searchInfo.data.films} searchQuery={search}/>
		</div>
	)
}
// https://kp.kinobox.tv/films/5417362
// get film info https://kp.kinobox.tv/films/${id}

//catalog
//https://kp.kinobox.tv/films/list?released=true&page=1

//search https://kp.kinobox.tv/films/search/?query=${query}


import {request} from "@/services/utils/request";

export const searchRequest = async (query: string) => {
	if (!query) return;
	return request(`/search/?query=${query}`)
}

export const getFilmDetail = async (id: string) => {
	if (!id) return;
	return request(`/${id}`)
}

export const getFilmsList = async (query: string) => {
	if (!query) return;
	return request(`/list?released=true&page=1`)
}
// https://kp.kinobox.tv/films/5417362
// get film info https://kp.kinobox.tv/films/${id}

//catalog
//https://kp.kinobox.tv/films/list?released=true&page=1

//search https://kp.kinobox.tv/films/search/?query=${query}


import { request } from "@/services/utils/request";
import { convertToOldStructure } from "@/services/utils/filmAdapter";

/**
 * Process API response to ensure compatibility with both old and new structures
 */
const processApiResponse = (response: any) => {
  if (!response) return response;
  
  // Handle search results
  if (response.data && response.data.films) {
    response.data.films = response.data.films.map((film: any) => convertToOldStructure(film));
  }
  
  // Handle single film detail
  if (response.data && !response.data.films) {
    response.data = convertToOldStructure(response.data);
  }
  
  return response;
};

export const searchRequest = async (query: string) => {
  if (!query) return;
  const response = await request(`/search/?query=${query}`);
  return processApiResponse(response);
};

export const getFilmDetail = async (id: string) => {
  if (!id) return;
  const response = await request(`/${id}`);
  return processApiResponse(response);
};

export const getFilmsList = async (page = "1") => {
  const response = await request(`/list?released=true&page=${page}`);
  return processApiResponse(response);
};
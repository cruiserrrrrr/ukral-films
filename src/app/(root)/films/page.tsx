import Films from "@/shared/pages/films";
import { getFilmsList } from "@/services/api/kbox";
import type { Metadata } from "next";
import { defaultMetadata } from "@/shared/data/metadata";
import filtersData from "@/shared/data/filters/filters.json";

export const metadata: Metadata = {
  ...defaultMetadata,
};

export default async function Page({ params, searchParams }: any) {
  const { page, country, years, genre } = searchParams;
  
  // Формируем строку параметров для запроса
  let queryParams = "";
  
  // Добавляем страницу
  queryParams += page ? `&page=${page}` : "&page=1";
  
  // Добавляем фильтры, если они есть
  if (country) queryParams += `&country=${country}`;
  if (years) queryParams += `&years=${years}`;
  if (genre) queryParams += `&genre=${genre}`;
  
  const filmsData = await getFilmsList(queryParams);
  const films = filmsData.data ? filmsData.data.items : [];
  const totalPages = filmsData.data ? (filmsData.data.total / 50) : 1;
  
  // Преобразуем ID стран в их названия
  const countryNames = country ? country.split("-").map(id => {
    const countryItem = filtersData.country.find(c => c.id === id);
    return countryItem ? countryItem.name : id;
  }) : [];
  
  // Преобразуем значения годов в их метки
  const yearLabels = years ? years.split("-").map(value => {
    const yearItem = filtersData.year.find(y => y.value === value);
    return yearItem ? yearItem.label : value;
  }) : [];
  
  // Преобразуем значения жанров в их метки
  const genreLabels = genre ? genre.split("-").map(value => {
    const genreItem = filtersData.genre.find(g => g.value === value);
    return genreItem ? genreItem.label : value;
  }) : [];

  return <Films
    films={films}
    totalPages={totalPages}
    currentPage={page || "1"}
    selectedCountry={countryNames}
    selectedYears={yearLabels}
    selectedGenre={genreLabels}
  />;
}
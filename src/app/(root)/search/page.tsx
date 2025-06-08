import { searchRequest } from "@/services/api/kbox";
import Search from "@/shared/pages/search/search";

const empty = {
  data: {
    films: [],
    items: [],
    error: true,
  },
};

export async function generateMetadata({ searchParams }: any) {
  const { search, page = "" } = await searchParams;
  const searchInfo = search ? await searchRequest(search) : empty;
  const films = searchInfo.error ? [] : searchInfo.data.films ? searchInfo.data.films : searchInfo.data.items;
  
  return {
    title: `Результаты поиска по запросу: ${search}.`,
    description: `По результатам запроса: , найдено ${films.length} фильма. ${page > 1 ? `Страница - ${page}` : ""}`,
    openGraph: {
      title: `Результаты поиска по запросу: ${search}.`,
      description: `По результатам запроса: , найдено ${films.length} фильма. ${page > 1 ? `Страница - ${page}` : ""}`,
    },
  };
}

export default async function Page({ params, searchParams }: any) {
  const { search, page = "" } = await searchParams;
  const searchInfo = search ? await searchRequest(search) : empty;
  const films = searchInfo.error ? [] : searchInfo.data.films ? searchInfo.data.films : searchInfo.data.items;
  
  // https://avatars.mds.yandex.net/get-kinopoisk-image/10853012/a63fdd21-e770-4b28-af61-6897a7f16130/360
  // //avatars.mds.yandex.net/get-kinopoisk-image/1599028/4e7232fd-d37b-4cf1-935a-cbd684fe7f7c
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
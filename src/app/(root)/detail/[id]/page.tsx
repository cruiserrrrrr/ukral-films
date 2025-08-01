import { getFilmDetail, searchRequest } from "@/services/api/kbox";
import Detail from "@/shared/pages/detail";

interface IInfo {
  data: {
    movie: ISearchElem;
  };
}

export async function generateMetadata({ params }: any) {
  const { id } = await params;
  const info: IInfo = await getFilmDetail(id);
  const card = info?.data?.movie || {};
  
  return {
    title: `Смотреть бесплатно фильм - ${card.title.russian || card.title.original || ""}`,
    description: `Описания фильма - ${card.title.russian || card.title.original}. Смотреть бесплатно. ${card.description || ""}`,
    openGraph: {
      title: `Смотреть бесплатно фильм - ${card.title.russian || card.title.original}`,
      description: `Описания фильма - ${card.title.russian || card.title.original}. Смотреть бесплатно. ${card.description || ""}`,
    },
  };
}


export default async function Page({ params }: any) {
  const { id } = await params;
  const info: IInfo = await getFilmDetail(id);
  console.log(info, "info ");
  const card = info?.data?.movie || {};
  // const subCards = card.title.original ? await searchRequest(card.title.original) : [];
  const subCards = [];
  return (
    <Detail card={card} subCards={[]} />
  );
}
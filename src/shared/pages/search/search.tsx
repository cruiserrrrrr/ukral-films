"use client";

import styles from "./index.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { searchRequest } from "@/services/api/kbox";
import { useRouter } from "next/navigation";
import FilmsList from "@/shared/components/FilmsList";
import { notifications } from "@mantine/notifications";
import { incorrectQuery } from "@/shared/apiErrors/apiErrors";
import { Button, Input } from "@mantine/core";

interface ISearch {
  films: ISearchElem[];
  searchQuery: string;
  page?: string;
  error?: {
    status: string;
    title: string;
    code: number;
    details: string;
  };
}

const Search = (props: ISearch) => {
  const {
    searchQuery,
    films = [],
    page = "",
    error,
  } = props;
  const [value, setValue] = useState<string>(searchQuery || "");
  const [filmsList, setFilmsList] = useState<ISearchElem[]>(films);
  const router = useRouter();
  
  
  const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const newFilms = await searchRequest(value);
    if (!!newFilms.data.films.length) {
      setFilmsList(newFilms.data.films);
      router.replace(`/search?search=${value}&page=${page || 1}`);
    }
  };
  
  useEffect(() => {
    if (error) {
      notifications.show({
        title: error.title === incorrectQuery.title ? incorrectQuery.name : error.title,
        message: error.title === incorrectQuery.title ? incorrectQuery.details : error.title,
        style: { backgroundColor: "var(--floral-white)" },
        position: "bottom-center",
      });
    }
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Результаты поиска по запросу: {searchQuery}</h1>
        <form className={styles.search} onSubmit={handleSearch}>
          <Input
            type={"text"}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Поиск"}
            size={"lg"}
            radius={"lg"}
            color="darkPurple"
          />
          <Button type={"submit"} size={"lg"} radius={"lg"}>Поиск</Button>
        </form>
        <FilmsList films={filmsList} />
      </div>
    </div>
  );
};

export default Search;
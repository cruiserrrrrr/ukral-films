"use client";

import styles from "./index.module.scss";
import FilmCard from "@/shared/components/FilmCard";
import {ChangeEvent, useState} from "react";
import {searchRequest} from "@/services/api/kbox";
import {useRouter} from "next/navigation";

interface ISearch {
	films: ISearchElem[];
	searchQuery: string;
}

const Search = (props: ISearch) => {
	const {searchQuery, films = []} = props;
	const [value, setValue] = useState<string>(searchQuery || "");
	const [filmsList, setFilmsList] = useState<ISearchElem[]>(films);
	const router = useRouter()


	const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!value) return;
		const newFilms = await searchRequest(value);
		if (!!newFilms.data.films.length) {
			setFilmsList(newFilms.data.films)
			router.replace(`/search?search=${value}`)
		}
	}

	return (
		<div className={styles.container}>
			<h1>Search {searchQuery}</h1>
			<form className={styles.search} onSubmit={handleSearch}>
				<input
					className={styles.input}
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={"Search"}
				/>
				<button type={"submit"} className={styles.button}>Search</button>
			</form>
			<div className={styles.list}>
				{filmsList.map((film: ISearchElem, index: number) => (
					<FilmCard card={film} key={index + film.title.original}/>
				))}
			</div>
		</div>
	)
}

export default Search;
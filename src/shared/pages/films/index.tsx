"use client";

import styles from "./index.module.scss";
import { MultiSelect, Pagination, Title } from "@mantine/core";
import FilmsList from "@/shared/components/FilmsList";
import filtersData from "@/shared/data/filters/filters.json";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getFilmsList } from "@/services/api/kbox";

interface IFilms {
  films: ISearchElem[];
  totalPages: number;
  currentPage: string;
  selectedCountry?: string[];
  selectedYears?: string[];
  selectedGenre?: string[];
}

const Films = (props: IFilms) => {
  const {
    films: initialFilms,
    totalPages: initialTotalPages,
    currentPage: initialPage = "1",
    selectedCountry: initialCountry = [],
    selectedYears: initialYears = [],
    selectedGenre: initialGenre = [],
  } = props;
  
  // Состояние для фильтров и данных
  const [selectedCountry, setSelectedCountry] = useState<string[]>(initialCountry);
  const [selectedYears, setSelectedYears] = useState<string[]>(initialYears);
  const [selectedGenre, setSelectedGenre] = useState<string[]>(initialGenre);
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [films, setFilms] = useState<ISearchElem[]>(initialFilms);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const router = useRouter();
  
  // Создаем маппинги для преобразования между отображаемыми значениями и значениями для URL
  const countryNameToIdMap = useMemo(() => {
    const map = new Map<string, string>();
    filtersData.country.forEach(country => {
      map.set(country.name, country.id);
    });
    return map;
  }, []);
  
  const countryIdToNameMap = useMemo(() => {
    const map = new Map<string, string>();
    filtersData.country.forEach(country => {
      map.set(country.id, country.name);
    });
    return map;
  }, []);
  
  const yearLabelToValueMap = useMemo(() => {
    const map = new Map<string, string>();
    filtersData.year.forEach(year => {
      map.set(year.label, year.value);
    });
    return map;
  }, []);
  
  const yearValueToLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    filtersData.year.forEach(year => {
      map.set(year.value, year.label);
    });
    return map;
  }, []);
  
  const genreLabelToValueMap = useMemo(() => {
    const map = new Map<string, string>();
    filtersData.genre.forEach(genre => {
      map.set(genre.label, genre.value);
    });
    return map;
  }, []);
  
  const genreValueToLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    filtersData.genre.forEach(genre => {
      map.set(genre.value, genre.label);
    });
    return map;
  }, []);
  
  const updateUrl = (page: string = currentPage, country: string[] = selectedCountry, years: string[] = selectedYears, genre: string[] = selectedGenre) => {
    let url = `/films?page=${page}`;
    
    if (country.length > 0) {
      const countryIds = country.map(name => countryNameToIdMap.get(name) || name);
      url += `&country=${countryIds.join("-")}`;
    }
    
    if (years.length > 0) {
      const yearValues = years.map(label => yearLabelToValueMap.get(label) || label);
      url += `&years=${yearValues.join("-")}`;
    }
    
    if (genre.length > 0) {
      const genreValues = genre.map(label => genreLabelToValueMap.get(label) || label);
      url += `&genre=${genreValues.join("-")}`;
    }
    
    window.history.replaceState({}, "", url);
  };
  
  const buildQueryParams = (page: string, country: string[], years: string[], genre: string[]) => {
    let queryParams = `&page=${page}`;
    
    if (country.length > 0) {
      const countryIds = country.map(name => countryNameToIdMap.get(name) || name);
      queryParams += `&country=${countryIds.join("-")}`;
    }
    
    if (years.length > 0) {
      const yearValues = years.map(label => yearLabelToValueMap.get(label) || label);
      queryParams += `&years=${yearValues.join("-")}`;
    }
    
    if (genre.length > 0) {
      const genreValues = genre.map(label => genreLabelToValueMap.get(label) || label);
      queryParams += `&genre=${genreValues.join("-")}`;
    }
    
    return queryParams;
  };
  
  const fetchFilms = async (page: string, country: string[], years: string[], genre: string[]) => {
    setIsLoading(true);
    try {
      const queryParams = buildQueryParams(page, country, years, genre);
      const filmsData = await getFilmsList(queryParams);
      
      if (filmsData && filmsData.data) {
        setFilms(filmsData.data.films || []);
        setTotalPages(filmsData.data.total / 50);
      }
    } catch (error) {
      console.error("Error fetching films:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFiltersChange = (page: string, country: string[], years: string[], genre: string[]) => {
    updateUrl(page, country, years, genre);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      fetchFilms(page, country, years, genre);
    }, 500);
  };
  
  const handlePush = (page: number) => {
    const pageStr = page.toString();
    setCurrentPage(pageStr);
    handleFiltersChange(pageStr, selectedCountry, selectedYears, selectedGenre);
  };
  
  const handleSelectCountry = (country: string[]) => {
    setSelectedCountry(country);
    handleFiltersChange(currentPage, country, selectedYears, selectedGenre);
  };
  
  const handleSelectYears = (years: string[]) => {
    setSelectedYears(years);
    handleFiltersChange(currentPage, selectedCountry, years, selectedGenre);
  };
  
  const handleSelectGenre = (genre: string[]) => {
    setSelectedGenre(genre);
    handleFiltersChange(currentPage, selectedCountry, selectedYears, genre);
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  return (
    <div className={styles.container}>
      <Title order={1}>Фильмы</Title>
      <div className={styles.filters}>
        <MultiSelect
          label={"Страна"}
          className={styles.select}
          data={filtersData.country.map((f) => f.name)}
          onChange={handleSelectCountry}
          value={selectedCountry}
          disabled={isLoading}
        />
        <MultiSelect
          label={"Год"}
          className={styles.select}
          data={filtersData.year.map((f) => f.label)}
          onChange={handleSelectYears}
          value={selectedYears}
          tabIndex={0}
          disabled={isLoading}
        />
        <MultiSelect
          label={"Жанр"}
          className={styles.select}
          data={filtersData.genre.map((f) => f.label)}
          onChange={handleSelectGenre}
          value={selectedGenre}
          disabled={isLoading}
        />
      </div>
      
      {isLoading ? (
        <div className={styles.loading}>Загрузка фильмов...</div>
      ) : (
        <>
          <FilmsList films={films} />
          <Pagination
            total={totalPages}
            onChange={handlePush}
            value={Number(currentPage)}
            disabled={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default Films;
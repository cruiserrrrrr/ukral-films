interface ISearchElem {
  id: string | number;
  type: string;
  title: {
    russian: string;
    original: string;
  };
  // Support for old structure
  posterUrl?: string;
  // Support for new structure
  gallery?: {
    posterUrl: string;
    coverUrl: string | null;
  };
  year: number;
  rating: {
    kinopoisk: {
      value: number | null;
      count: number | null;
    };
    imdb: {
      value: number | null;
      count: number | null;
    };
  };
  countries: {
    id: number;
    name: string;
    position: number;
  }[];
  genres: {
    id: number;
    name: string;
    slug: string | null;
    position: number;
  }[];
  description: string | null;
  // Additional fields from new structure
  releaseDate?: string | null;
  duration?: string | number | null;
  restriction?: {
    age: string | null;
    mpaa: string | null;
  };
  tagline?: string | null;
  synopsis?: string | null;
  platforms?: any[];
  collections?: {
    id: number;
    name: string;
    coverUrl: string;
  }[];
}
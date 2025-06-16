import styles from "./index.module.scss";
import FilmCard from "@/shared/components/FilmCard";
import { getPosterUrl } from "@/services/utils/filmAdapter";

interface IList {
  films: ISearchElem[];
  isHistory?: boolean;
}

const FilmsList = (props: IList) => {
  const { films, isHistory = false } = props;
  return (
    <div className={styles.list}>
      {films.map((film: ISearchElem, index: number) => {
        if (getPosterUrl(film)) {
          return <FilmCard card={film} key={`${film.id}-${index}`} isHistory={isHistory} />;
        }
        return null;
      })}
    </div>
  );
};

export default FilmsList;
import styles from "./index.module.scss";
import FilmCard from "@/shared/components/FilmCard";
import { getPosterUrl } from "@/services/utils/filmAdapter";

interface IList {
  films: ISearchElem[];
}

const FilmsList = (props: IList) => {
  const { films } = props;
  return (
    <div className={styles.list}>
      {films.map((film: ISearchElem, index: number) => {
        // Only render films that have a poster URL (in either format)
        if (getPosterUrl(film)) {
          return <FilmCard card={film} key={`${film.id}-${index}`} />;
        }
        return null;
      })}
    </div>
  );
};

export default FilmsList;
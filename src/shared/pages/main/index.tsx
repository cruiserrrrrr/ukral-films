import styles from "./index.module.scss";
import SearchContent from "@/shared/components/SearchContent";

const Main = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>UKRAL FILMS</h1>
      <div className={styles.white} />
      <div className={styles.blue} />
      <div className={styles.red} />
      <SearchContent />
    </div>
  );
};

export default Main;
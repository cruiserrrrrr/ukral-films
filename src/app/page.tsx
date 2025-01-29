import Image from "next/image";
import styles from "./page.module.scss";
import Player from "@/shared/components/player";

export default function Home() {
	return (
		<div className={styles.page}>
			<Player/>
		</div>
	);
}

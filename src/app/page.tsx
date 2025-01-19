import Image from "next/image";
import styles from "./page.module.css";
import Player from "@/shared/components/player";

export default function Home() {
	return (
		<div className={styles.page}>
			<Player/>
		</div>
	);
}

import styles from "./page.module.css";
import Header from "../components/Header";
import Fact from "../components/Fact";

export default function Home() {
	return (
		<main className={styles.main}>
			<Header />
			<Fact />
		</main>
	);
}

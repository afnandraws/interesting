import styles from "./page.module.css";
import Header from "../components/Header";
import Fact from "../components/Fact";
import Header2 from "@/components/Header2";

export default function Home() {
	return (
		<main className={styles.main}>
			<Header2 />
			<Header />
			<Fact />
		</main>
	);
}

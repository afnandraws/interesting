import styles from "./page.module.css";
import Header from "@/components/Header";
import SavedPosts from "@/components/SavedFacts";

export default function Saved() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Header />
				<SavedPosts />
			</main>
		</div>
	);
}

"use client";

import styles from "./page.module.css";
import Header from "../components/Header";
import Facts from "../components/Facts";

export default function Home() {
	return (
		<main className={styles.main}>
			<Header />
			<Facts />
		</main>
	);
}

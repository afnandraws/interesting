"use client";

import styles from "./SavedFacts.module.css";

import { useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import Fact from "./Fact";

let loadedFacts = []

const SavedPosts = () => {
	const [facts, setFacts] = useState([]);
	const username = useAppSelector((state) => state.authReducer.username);
	const savedPosts = useAppSelector((state) => state.authReducer.savedPosts);

	useEffect(() => {
				const getSavedPosts = async (savedPosts) => {
				const response = await fetch("https://interesting-app-backend.onrender.com/facts/favourites", {
					method: "POST",
					headers: {
						'Accept': "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ facts: savedPosts }),
				}).then(res => {
					if (res.ok) {
						return res.json()
					}
				}).then(data => {
					console.log(data)
					for (const key in data) {
					loadedFacts.push({
						id: data[key]._id,
						fact: data[key].fact,
						createdBy: data[key].createdBy === undefined ? "anonymous" : data[key].createdBy,
					})
					setFacts(loadedFacts)	
				}					
				}
				);
			}
			getSavedPosts(savedPosts).catch(error => {console.log(error.message)})
		}
	), [];	

	const factsMapped = facts.map(fact => <Fact key={fact.id} fact={fact.fact} createdBy={fact.createdBy} username={username}/> )

	return (
		<div className={styles.container}>
			<h1>Hi {username}! Here are <br />your saved Facts:</h1>
			<div>{factsMapped}</div>
		</div>
	);
};

export default SavedPosts;

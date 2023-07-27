"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";

const loadedFacts = []

const SavedPosts = () => {
	const [facts, setFacts] = useState([]);
	const username = useAppSelector((state) => state.authReducer.username);
	const savedPosts = useAppSelector((state) => state.authReducer.savedPosts);
	const { push } = useRouter();

	useEffect(() => {
		if (!username) {
			push("/");
		} else {
			const getSavedPosts = async (savedPosts) => {
				const response = await fetch("http://localhost:3001/facts/favourites", {
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
					data.forEach(fact => {setFacts(...facts, fact)})
					
				});
			}

			getSavedPosts(savedPosts).catch(error => {console.log(error.message)})
		}
	}), [];	

	return (
		<div>
			<h2>Saved Posts</h2>
			<ul></ul>
		</div>
	);
};

export default SavedPosts;

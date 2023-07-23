'use client'

import { useEffect, useState } from "react";
import styles from "./Fact.module.css";
import { useAppSelector } from "../../redux/store";

const loadedFacts = [];

const Fact = () => {
	const [facts, setFacts] = useState([{}]);
	const [counter, setCounter] = useState(0);
	const [save, setSave] = useState(false);

	const username = useAppSelector((state) => state.authReducer.username)

	function saveHandler(e) {
		e.preventDefault();
		setSave((prevState) => {
			return !prevState;
		});
		console.log(save);
	}

	function navigationHandler(event) {
		switch (event.target.id) {
			case "previous":
				if (counter - 1 < 0) {
				} else {
					setCounter(counter - 1);
				}
				break;
			case "next":
				console.log(counter)
				if (facts[counter + 1]) {
					setCounter(counter + 1);
				}
	
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		const fetchFacts = async () => {
			const response = await fetch('http://localhost:3001/facts')
			.then(res => {
				console.log(res)
				if (res.ok) {
					return res.json()
				}
			}).then(data => {
				console.log(data)
				for (const key in data) {
			
					loadedFacts.push({
						fact: data[key].fact,
						createdBy: data[key].createdBy === undefined ? "anonymous" : data[key].createdBy,
					})
				
				setFacts(loadedFacts)
				}
			})
		}

		fetchFacts().catch((error) => {
			console.log(error.message);
		});

	}, []);

	useEffect(() => {
		console.log(facts)
	}, [facts])
	

	return (
		<div className={styles.container}>
			<h3 className={styles.text}>
				hello {username}, today's interesting fact of the day is...
			</h3>

			<div className={styles.card}>
				<p>{facts[counter].fact}</p>
				<p>{facts[counter].createdBy}</p>
			</div>

			<div className={styles.buttongroup}>
				<button onClick={saveHandler}>{save ? "saved" : "save"}</button>
				<button onClick={navigationHandler} id="previous">
					previous
				</button>
				<button onClick={navigationHandler} id="next">
					next
				</button>
			</div>
		</div>
	);
};

export default Fact;

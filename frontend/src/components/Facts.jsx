'use client'

import { useEffect, useState } from "react";
import styles from "./Facts.module.css";
import { useAppSelector } from "../../redux/store";
import Image from "next/image";

import savedIcon from '../../public/savedIcon.svg'
import saveIcon from '../../public/saveIcon.svg'
import Arrow from '../../public/previousArrow.svg'
import { useDispatch } from "react-redux";
import { savePost, unsavePost } from "../../redux/slices/authSlice";

let loadedFacts = [];

const Facts = () => {
	
	const [factCount, setFactCount] = useState(0); //this allows for the user to shuffle through the posts
	const [facts, setFacts] = useState([{}]); //this holds the variables
	const [counter, setCounter] = useState(0); //this allows for the user to shuffle through the posts
	const [showAddNewFact, setShowAddNewFact] = useState(false); //this handles whether or not something is being saved
	const [save, setSave] = useState(false); //this handles whether or not something is being saved
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch();

	const savedPosts = useAppSelector((state) => state.authReducer.savedPosts)
	const username = useAppSelector((state) => state.authReducer.username)
	const isAuth = useAppSelector((state) => state.authReducer.isAuth)
	const uid = useAppSelector((state) => state.authReducer.uid)
	//this is to display the username on the main text

	const saveButton = <button onClick={saveHandler}>{<Image alt="save" src={saveIcon} height={60} />}</button>
	const savedButton = <button style={{backgroundColor: "#FA3701", transform: 'translate(8px, -8px)', animation: 'none', boxShadow: '0px 0px 0px #FA3701'}} onClick={saveHandler}>{<Image alt="save" src={savedIcon} height={60} />}</button>

	function saveHandler(e) {
		e.preventDefault();
		
		console.log(save)
		switch (save) {
			case true:
				console.log(1)
				const postUnsavedFacts = async () => {
					const response = await fetch('http://localhost:3001/users/unsavepost',{
						method: 'POST',
						headers: {
						  'Accept': 'application/json',
						  'Content-Type': 'application/json'
						},
						body: JSON.stringify({id: uid, postID: facts[counter].id})
					  })
					const data = await response.json();
					console.log(data)
				}
				setSave(false)
				postUnsavedFacts()
				dispatch(
					unsavePost(facts[counter].id)
				)

				break;
			
			case false:
				console.log(2)
				const postSavedFacts = async () => {
					const response = await fetch('http://localhost:3001/users/savepost',{
						method: 'POST',
						headers: {
						  'Accept': 'application/json',
						  'Content-Type': 'application/json'
						},
						body: JSON.stringify({id: uid, postID: facts[counter].id})
					  })
					.then(res => {if (res.ok) {
						return res.json()
					}})
					.catch(err => {console.log(err)})
				}
				
				setSave(false)
				postSavedFacts()
				dispatch(
					savePost(facts[counter].id)
				)

				break;
			default:
				break;
		}
		
	}

	const submitNewFact = async (event) => {
		if (event.key === 'Enter') {
			const response = await fetch('http://localhost:3001/facts/add', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fact: event.target.value,
					createdBy: username,
				})
		}).catch((error) => {
			console.log(error.message);
		});

		const data = await response.json()
		console.log(data)
		setShowAddNewFact(false)
	
	}}

	function navigationHandler(event) {
		setShowAddNewFact(false)
		switch (event.target.id) {
			case "previous":
				if (!(counter - 1 < 0)) {
					setCounter(counter - 1);
				}
				break;
			case "next":
				console.log(counter)
				if (facts[counter + 1]) {
					setCounter(counter + 1);
				} else {
					console.log('worked')
					console.log(counter+1)
					console.log(factCount)
					if (factCount > counter+1) {
						setLoading(true)
						fetchFacts()
					}
				}
	
				break;
			default:
				break;
		}
	}


	useEffect(() => {
		if (savedPosts?.includes(facts[counter]?.id)) {
			setSave(true)
		} else {
			setSave(false)
		}
		console.log(save)
	}, [facts, savedPosts ,save, counter])
	
	const fetchFacts = async () => {

		const response = await fetch('http://localhost:3001/facts').catch((error) => {
			console.log(error.message);
		});
		const data = await response.json();
		console.log(data)
		for (const key in data) {
			if (!(loadedFacts.find(fact => fact.id === data[key]._id))) {
				loadedFacts.push({
					id: data[key]._id,
					fact: data[key].fact,
					createdBy: data[key].createdBy === undefined ? "anonymous" : data[key].createdBy,
					})
			}
		}
		setFacts(loadedFacts)
		setLoading(false)
	}

	const getCount = async () => {
		const response = await fetch('http://localhost:3001/facts/getcount').catch((error) => {
			console.log(error.message);
		});
		const data = await response.json()
		setFactCount(data);
	}
	 
	useEffect(() => {
		fetchFacts()
		getCount()
	}, []);


	return (
		<div className={styles.container}>
		<h1>Hi {username ? username : 'stranger'}, today's <br />interesting fact is...</h1>

		<div className={styles.bottombar}>
		{username ? (save ? savedButton : saveButton) : '' }

		<div>
			{(!loading && !showAddNewFact) && <div className={styles.fact}>
				<span>{facts[counter].fact}</span>
				<span>{facts[counter].createdBy === username ? 'Me!!' : facts[counter].createdBy}</span>
				</div>}
			
			{loading && <div className={styles.fact}>
				<span>loading...</span>
				</div>}

			{showAddNewFact && <div className={styles.fact}>
				<input onKeyDown={submitNewFact} placeholder="Type in your new interesting fact to share with the world!"/>
				<span>{username}</span>
				</div>}
	
			{isAuth && <div className={styles.cta}>Would you like to submit a new interesting fact? <span onClick={() => {setShowAddNewFact(!showAddNewFact)}}>Click here!</span></div>}
		</div>

		<button onClick={navigationHandler} id="previous"><Image alt="previous" src={Arrow} height={90}/></button>
		<button onClick={navigationHandler} id="next"><Image style={{transform: 'rotate(180deg)'}} alt="next" src={Arrow} height={90}/></button>
		</div>

		</div>
	);
};

export default Facts;

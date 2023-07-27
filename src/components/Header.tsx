"use client";

import styles from "./Header.module.css";
import ProfilePanel from "./ProfilePanel";
import LogOutPanel from "./LogOutPanel";
import { initialCheck } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../redux/store";

const Header = () => {
	const [open, setOpen] = useState(false);
	const isAuth = useAppSelector((state) => state.authReducer.isAuth);

	//isAuth is part of authSlice, handling the log on state

	const dispatch = useDispatch();

	const memoizedValue = useMemo(
		() =>
			dispatch(
				initialCheck({
					username: localStorage.getItem("username"),
					uid: localStorage.getItem("id"),
					savedPosts: localStorage.getItem("savedPosts"),
				})
			),
		[dispatch]
	);
	//this does an initialCheck on load to check if the user has previously logged in
	//log in state is stored in both localStorage and redux state
	//this is to persist between browser sessions and reloads.

	//memoizedValue contains an object the authSlice if there was a prior session
	console.log(memoizedValue);

	const openHandler = () => {
		setOpen(!open);
		//this handles the Signin/Logout form visibility
	};

	return (
		<>
			<header className={styles.header}>
				<button
					onClick={() => {
						setOpen(!open);
					}}>
					{isAuth ? "Profile" : "Sign-In"}
				</button>
				{isAuth && (
					<button>
						<a href="/saved">Saved</a>
					</button>
				)}
				{isAuth && (
					<button className={styles.cta}>
						<a href="/">add a new fact</a>
					</button>
				)}
			</header>
			{open && !isAuth && <ProfilePanel openHandler={openHandler} />}
			{open && isAuth && <LogOutPanel />}
		</>
	);
};

export default Header;

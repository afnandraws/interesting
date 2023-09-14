"use client";

import styles from "./Header.module.css";
import loggedInProfile from "../../public/loggedInProfile.svg";
import signInProfile from "../../public/signInProfile.svg";

import ProfilePanel from "./ProfilePanel";

import { initialCheck } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
	const router = useRouter();
	let url;
	const [open, setOpen] = useState(false);
	const isAuth = useAppSelector((state) => state.authReducer.isAuth);
	const dispatch = useDispatch();
	if (typeof window !== "undefined") {
		url = window.location.href;
		console.log(url);
		//isAuth is part of authSlice, handling the log on state
	}

	useEffect(() => {
		const storedString = localStorage?.getItem("savedPosts");
		const storedArray = storedString
			?.split(",")
			.filter((post) => post !== undefined && post !== null && post !== "");

		dispatch(
			initialCheck({
				username: localStorage?.getItem("username"),
				uid: localStorage?.getItem("id"),
				savedPosts: storedArray,
			})
		);
	}, []);

	//this does an initialCheck on load to check if the user has previously logged in
	//log in state is stored in both localStorage and redux state
	//this is to persist between browser sessions and reloads.

	//memoizedValue contains an object the authSlice if there was a prior session

	const openHandler = () => {
		setOpen(!open);
		//this handles the Signin/Logout form visibility
	};

	const logoutHandler = () => {
		localStorage?.removeItem("id");
		localStorage?.removeItem("username");
		router.push("/");
		location.reload();
	};

	return (
		<>
			<header className={styles.header}>
				<button
					style={{ backgroundColor: isAuth ? "#FA3701" : "" }}
					onClick={(e) => {
						e.currentTarget.focus();
						setOpen(!open);
					}}
					onBlur={(e) => {
						e.currentTarget.blur();
					}}>
					{isAuth ? (
						<Image alt="logged in" src={loggedInProfile} height={90} />
					) : (
						<Image alt="sign in" src={signInProfile} height={90} />
					)}
				</button>

				{open && isAuth && (
					<div className={styles.buttongroup}>
						<button>
							<a href={url?.includes("saved") ? "/" : "/saved"}>
								{url?.includes("saved") ? "Home" : "Saved Posts"}
							</a>
						</button>
						<button onClick={logoutHandler}>Log Out</button>
					</div>
				)}

				{open && !isAuth && <ProfilePanel openHandler={openHandler} />}
			</header>
		</>
	);
};

export default Header;

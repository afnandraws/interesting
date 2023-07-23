"use client";

import styles from "./Header.module.css";
import ProfilePanel from "./ProfilePanel";
import { initialCheck } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../redux/store";

const Header2 = () => {
	const [open, setOpen] = useState(false);
	const isAuth = useAppSelector((state) => state.authReducer.isAuth);

	const dispatch = useDispatch();
	const memoizedValue = useMemo(
		() =>
			dispatch(
				initialCheck({
					username: localStorage.getItem("username"),
					uid: localStorage.getItem("id"),
				})
			),
		[dispatch]
	);

	console.log(memoizedValue);

	return <div>hi</div>;
};

export default Header2;

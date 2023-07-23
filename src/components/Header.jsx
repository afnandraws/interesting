'use client'

import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import ProfilePanel from "./ProfilePanel";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('id') && localStorage.getItem('username')) {
            setOpen(false)
            setLoggedIn(true)
        }
    }, [loggedIn])
    
    const openHandler = () => {
        setOpen(true)
        setLoggedIn(true)
    }
    return (
        <>
        <header className={styles.header}>
                <button onClick={() => {setOpen(!open)}}>{loggedIn ? 'Profile' : 'Sign-In'}</button>
              
                {loggedIn && <button><a href="/saved">Saved</a></button>}
                {loggedIn && <button className={styles.cta}><a href="/">add a new fact</a></button>}
        </header>
        {open && <ProfilePanel loggedIn={loggedIn} openHandler={openHandler}/>}
        </>
    );
}
 
export default Header;
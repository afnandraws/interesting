
const LogOutPanel = () => {

    const logoutHandler = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        location.reload();
    }

    return ( 
    <div className={styles.dropdown}>
        <form className={styles.container}>
            <button className={styles.submit} onClick={logoutHandler}>log out</button>
        </form>
    </div>
     );
}
 
export default LogOutPanel;
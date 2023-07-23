'use client'

import { useState } from 'react';
import styles from './ProfilePanel.module.css'
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/slices/authSlice';

const ProfilePanel = (props) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [option, setOption] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const focusHandler = (event) => {
        console.log(event.target.innerText)

        if (event.target.innerText === 'Login') {
          setOption(true)
          event.target.focus()
        } else {
          setOption(false)
        }

    }

    const signupHandler = (event) => {
      event.preventDefault()
      setLoading(true)
      setError(false)


      const signupPost = async () => {
        const response = await fetch('http://localhost:3001/users/add', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
          })
          .then(res => {
            console.log(res)
            if (res.ok) {
                return res.json()
            } else if (res.status === 404) {
                  setError(true)
                  setLoading(false)
                  return
                } else {
                  setLoading(false) //this handles any errors outside of empty fields
                }
              }).then(data => {
              
                console.log(data)
                localStorage.setItem('id', data._id)
                localStorage.setItem('username', data.username)
                props.openHandler()
                setLoading(false)

              })
        }

        signupPost().catch((error) => {
          console.log(error.message);
        });

    }

    const loginHandler = (event) => {
      event.preventDefault()
      setLoading(true)
      setError(false)

      const loginPost = async () => {
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
          })
          .then(res => {
            console.log(res)
            if (res.ok) {
                return res.json()
            } else if (res.status === 404) {
                  setError(true)
                  setLoading(false)
                  return
                } else {
                  setLoading(false) //this handles any errors outside of empty fields
                }
              }).then(data => {
                if (data === null || data === undefined) {
                  setError(true)
                  setLoading(false)
                  return
                }
                localStorage.setItem('id', data._id)
                localStorage.setItem('username', data.username)
                dispatch(logIn({username: localStorage.getItem('username'), uid: localStorage.getItem('id')}))
                props.openHandler()
                setLoading(false)

              })
        }

      loginPost().catch((error) => {
			  console.log(error.message);
		  });
    }

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value)
    } 
    
    return ( 
        <>
        <div className={styles.dropdown}>
            <div className={styles.select}>
                <button onClick={focusHandler}>Login</button>
                <span>|</span>
                <button onClick={focusHandler}>Signup</button>
            </div>

            {option &&
            <form className={styles.inputs}>
            <div>
            <label>Username</label>
            <input value={username} onChange={usernameHandler} type="text" placeholder="Enter Username" required />
            </div>

            <div>
            <label>Password</label>
            <input value={password} onChange={passwordHandler} type="password" placeholder="Enter Password" required />
            </div>
            {error ? <p>You have entered incorrect login details</p> : ''}

            <button className={styles.submit} onClick={loginHandler}>{loading ? 'loading' : 'Login'}</button>
            </form>
            }

            {!option &&
               <form className={styles.inputs}>
               <div>
               <label>Username</label>
               <input value={username} onChange={usernameHandler} type="text" placeholder="Enter Username" required />
               </div>
   
               <div>
               <label>Password</label>
               <input value={password} onChange={passwordHandler} type="password" placeholder="Enter Password" required />
               </div>

               <div>
               <label>Confirm Password</label>
               <input value={confirmPassword} onChange={confirmPasswordHandler} type="password" placeholder="Re-enter Password" required />
               </div>
               {password !== confirmPassword ? <p>You have entered incorrect login details</p> : ''}
   
               <button className={styles.submit} onClick={signupHandler}>{loading ? 'loading' : 'Signup'}</button>
               </form>
            }
        </div>
        </>
     );
} 

 
export default ProfilePanel;
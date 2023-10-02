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
    
    const [signInOption, setSignInOption] = useState(true)
    const [signUpOption, setSignUpOption] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

 
    const signupPost = async () => {
      const response = await fetch('https://interesting-app-backend.onrender.com/users/add', {
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
              localStorage?.setItem('id', data._id)
              localStorage?.setItem('username', data.username)
              props.openHandler()
              setLoading(false)
              loginPost()
          }).catch((error) => {
              console.log(error.message);
          });
      }

    const loginPost = async () => {
      const response = await fetch('https://interesting-app-backend.onrender.com/users', {
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
            if (data === null || data === undefined) {
                setError(true)
                setLoading(false)
                return
              }
              localStorage?.setItem('id', data._id)
              localStorage?.setItem('username', data.username)
              localStorage?.setItem('savedPosts', data.savedPosts)
              dispatch(logIn({username: data.username, uid:data._id, savedPosts: data.savedPosts}))
              props.openHandler()
              setLoading(false)

          }).catch((error) => {
              console.log(error.message);
          });
    }

    const signInHandler = (event) => {
      event.preventDefault();
      if (signInOption) {
        setLoading(true)
        setError(false)
        loginPost()
      } else {
        setSignInOption(true)
        setSignUpOption(undefined)
      }
    }

    const signUpHandler = (event) => {
      event.preventDefault();
      if (signUpOption) {
        setLoading(true)
        setError(false)
        signupPost()
      } else {
        setSignUpOption(true)
        setSignInOption(false)
      }
    }
    
    return ( 
        <div className={styles.container}>
            <div className={styles.firstrow}>
                <input tabIndex="0" value={username} onChange={e => {setUsername(e.target.value)}} type="text" placeholder="Enter Username" required />
                <button onClick={signInHandler} style={{ backgroundColor: signInOption && '#FA3701', color: signInOption && '#FCF6EA' }}>Login</button>
                <button onClick={signUpHandler} style={{ backgroundColor: signUpOption && '#FA3701', color: signUpOption && '#FCF6EA' }}>Sign-Up</button>
            </div>
            <div className={styles.secondrow}>
              <input tabIndex="0" value={password} onChange={e => {setPassword(e.target.value)}} type="password" placeholder="Enter Password" required />
              {signUpOption && !signInOption && <input value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} type="password" placeholder="Re-enter Password" required />}
            </div>
        </div>
     );
} 

 
export default ProfilePanel;
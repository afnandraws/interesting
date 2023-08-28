import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
    savedPosts: string[]; isAuth: boolean, username: string, uid: string
}

type authPayload = {username: string, uid: string, savedPosts: string[]}

const initialState = {
    isAuth: false,
    username: '',
    uid: '',
    savedPosts: [],
} as initialState;

console.log(initialState)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initialCheck: (state, action: PayloadAction<object>) => {
            const newPayload = action.payload as authPayload;
            console.log(newPayload.savedPosts)

            if (newPayload.username && newPayload.uid) {
                return({
                    isAuth: true,
                    username: newPayload.username,
                    uid: newPayload.uid,
                    savedPosts: newPayload.savedPosts,
                })}

            return(undefined)
        },
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<object>) => {
            const newPayload = action.payload as authPayload;
            console.log(newPayload)
            return ({
                isAuth: true,
                username: newPayload.username,
                uid: newPayload.uid,
                savedPosts: newPayload.savedPosts
            })  
        },
        savePost: (state, action) => {
            const newPayload = action.payload;
            const newSavedPosts = [...state.savedPosts, newPayload]
            const storedSavedPosts = newSavedPosts.toLocaleString()
            console.log(newPayload)

            localStorage.setItem('savedPosts', storedSavedPosts)
            return ({
                isAuth: state.isAuth,
                username: state.username,
                uid: state.uid,
                savedPosts: newSavedPosts,
            })
        },
        unsavePost: (state, action) => {
            const newPayload = action.payload;
            const newSavedPosts = state.savedPosts.filter(post => post !== newPayload)
            const storedSavedPosts = newSavedPosts.toLocaleString()
            console.log(newPayload)

            localStorage.setItem('savedPosts', storedSavedPosts)

            return ({
                isAuth: state.isAuth,
                username: state.username,
                uid: state.uid,
                savedPosts: newSavedPosts,
            })
        }
    }
})

export const {initialCheck, logIn, logOut, savePost, unsavePost} = authSlice.actions
export default authSlice.reducer
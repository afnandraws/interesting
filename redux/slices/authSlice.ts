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
            console.log(newPayload)
            if (newPayload.username && newPayload.uid) {
                return({
                    isAuth: true,
                    username: newPayload.username,
                    uid: newPayload.uid,
                    savedPosts: state.savedPosts.concat(newPayload.savedPosts)
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
        }
    }
})

export const {initialCheck, logIn, logOut} = authSlice.actions
export default authSlice.reducer
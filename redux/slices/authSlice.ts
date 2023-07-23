import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = { isAuth: boolean, username: string, uid: string}
type authPayload = {username: string, uid: string}

const initialState = {
    isAuth: false,
    username: '',
    uid: ''
} as initialState;

console.log(initialState)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initialCheck: (state, action: PayloadAction<object>) => {
            const newPayload = action.payload as authPayload;

            if (newPayload.username && newPayload.uid) {
                return({
                    isAuth: true,
                    username: newPayload.username,
                    uid: newPayload.uid,
                })}

            return(initialState)
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
            })  
        }
    }
})

export const {initialCheck, logIn, logOut} = authSlice.actions
export default authSlice.reducer
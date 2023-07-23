import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = { isAuth: boolean, username: string, uid: string}
type authPayload = {username: string, uid: string}

const initialState = {
    isAuth: false,
    username: '',
    uid: ''
} as initialState;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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

export const {logIn, logOut} = authSlice.actions
export default authSlice.reducer
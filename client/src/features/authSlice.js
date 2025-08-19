import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: {
        id: null,
        email: null,
        role: null
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        userLogin: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        userLogout: (state, action) => {
            state.user = {
                id: null,
                email: null,
                role: null
            },
                state.token = null
        },
    }
})

export const { setToken, userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
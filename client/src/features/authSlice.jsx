import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('accessToken'),
    user: null,
    loading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false,
                state.isAuthenticated = true,
                state.token = action.payload.token,
                state.user = action.payload.user,
                localStorage.setItem('accessToken', action.payload.token)
        },
        loginFailure: (state) => {
            state.loading = false,
                state.isAuthenticated = false,
                state.token = null,
                state.user = null
        },
        logout: (state) => {
            state.isAuthenticated = false,
                state.token = null,
                state.user = null,
                localStorage.removeItem('accessToken')
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
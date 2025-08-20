import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     token: null,
//     user: {
//         id: null,
//         email: null,
//         role: null
//     },
// }
const getInitialState = () => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    return {
        token: token || null,
        user: userData ? JSON.parse(userData) : {
            id: null,
            email: null,
            role: null
        },
    };
};




export const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("authToken", action.payload);
        },
        userLogin: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("userData", JSON.stringify(state.user));
        },
        userLogout: (state) => {
            state.user = {
                id: null,
                email: null,
                role: null
            };
            state.token = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
        },

    }
})

export const { setToken, userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
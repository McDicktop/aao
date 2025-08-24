import { configureStore } from '@reduxjs/toolkit'
import gallerySlice from '../features/gallerySlice'
import appSlice from '../features/appSlice'
import authSlice from '../features/authSlice'


export const store = configureStore({
    reducer: {
        gallery: gallerySlice,
        app: appSlice,
        auth: authSlice,
    },

})
import { configureStore } from '@reduxjs/toolkit'
import gallerySlice from '../features/gallerySlice'
import appSlice from '../features/appSlice'


export const store = configureStore({
    reducer: {
        gallery: gallerySlice,
        app: appSlice,
    },

})
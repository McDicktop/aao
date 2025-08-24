import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    images: [],               // все изображения в б.д.
    galleries: [],          // все галлереи в б.д.
    posts: [],
    isImageFullsize: false,
    currentGallery: null,   // id выбранной галлереи
    currentArtwork: null,
}

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {

        updateImages: (state, action) => {
            state.images = [...action.payload]
        },

        updateGalleries: (state, action) => {
            state.galleries = [...action.payload]
        },

        toggleFullsize: (state, action) => {
            state.isImageFullsize = action.payload
        },

        setCurrentGallery: (state, action) => {
            state.currentGallery = action.payload;
        },

        setCurrentArtwork: (state, action) => {
            state.currentArtwork = action.payload;
        },

        updateGalleryOrder: (state, action) => {
            state.galleries = action.payload;
        },

        updateImageOrder: (state, action) => {
            state.images = action.payload;
        },

        updatePosts: (state, action) => {
            state.posts = action.payload;
        }

    }
})

export const { updateImages, updateGalleries, toggleFullsize, setCurrentGallery, setCurrentArtwork, updateGalleryOrder, updateImageOrder, updatePosts } = gallerySlice.actions;
export default gallerySlice.reducer;
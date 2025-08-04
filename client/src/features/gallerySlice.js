import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    images: [],               // все изображения в б.д.
    galleries: [],          // все галлереи в б.д.
    posters: [],
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

        updatePosters: (state, action) => {
            state.posters = action.payload;
        }

    }
})

export const { updateImages, updateGalleries, toggleFullsize, setCurrentGallery, setCurrentArtwork, updateGalleryOrder, updateImageOrder, updatePosters } = gallerySlice.actions;
export default gallerySlice.reducer;
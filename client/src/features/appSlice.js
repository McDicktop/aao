import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // language: 'ru',
    uploadArtworkForm: false,
    editArtworkForm: false,
    createGalleryForm: false,
    editGalleryForm: false,
    artworkView: false,

}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        handleForm: (state, action) => {
            switch (action.payload.form) {
                case ('uploadArtwork'): {
                    state.uploadArtworkForm = action.payload.isOpen;
                    break;
                }
                case ('createGallery'): {
                    state.createGalleryForm = action.payload.isOpen;
                    break;
                }
                case ('editGallery'): {
                    state.editGalleryForm = action.payload.isOpen;
                    break;
                }
                case ('editArtwork'): {
                    state.editArtworkForm = action.payload.isOpen;
                    break;
                }
                case ('artworkView'): {
                    state.artworkView = action.payload.isOpen;
                    break;
                }
            }
        },


    }
})

export const { handleForm } = appSlice.actions;
export default appSlice.reducer;
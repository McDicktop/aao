import axios from "axios";
import { backend_url } from "./constants";

export const getImages = async () => {
    try {
        const res = await axios.get(backend_url);
        return res.data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const getGalleries = async () => {
    try {
        const res = await axios.get(backend_url + 'gallery');
        return res.data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const getGalleryContent = async (id) => {
    try {
        const res = await axios.get(backend_url + 'gallery/' + id);
        return res.data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const createGallery = async (formData) => {
    try {
        const data = await axios.post(backend_url + 'gallery', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const editGallery = async (id, body) => {
    try {
        const data = await axios.put(backend_url + 'gallery/' + id, body)
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const changeCover = async (id, formData) => {
    try {
        const res = await axios.patch(backend_url + 'gallery/' + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res;
    } catch (e) {
        console.error(e);
        return e;
    }
}


export const deleteGallery = async (id) => {
    try {
        const res = await axios.delete(backend_url + 'gallery/' + id);
        return res;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const addImage = async (formData) => {
    try {
        const data = await axios.post(backend_url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const placeImageToGallery = async (id, imageId) => {
    try {
        const data = await axios.patch(backend_url + 'gallery/add/' + id, { imageId });
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const removeImageFromGallery = async (galleryId, imageId) => {
    try {
        const data = await axios.delete(backend_url + 'gallery/remove/' + galleryId, { data: { imageId } });
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const editArtwork = async (id, body) => {
    try {
        const data = await axios.put(backend_url + id, body);
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const deleteArtwork = async (id) => {
    try {
        const res = await axios.delete(backend_url + id);
        return res;
    } catch (e) {
        console.error(e);
        return e;
    }
}


export const deleteImage = async (filename) => {
    try {
        const data = await axios.delete(backend_url + 'file/' + filename)
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const changeArtworkOrder = async (data) => {
    try {
        const { imageId, newIndex, galleryId } = data;
        const res = await axios.patch(backend_url + 'gallery/move/' + galleryId, { imageId, newIndex });
        return res;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const changeGalleryPosition = async (data) => {
    try {
        const { newPos, galleryId } = data;
        const res = await axios.patch(backend_url + 'gallery/position/' + galleryId, { newPos });
        return res;
    } catch (e) {
        console.error(e);
        return e;
    }
}
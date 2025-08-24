import axios from "axios";
import { backend_url } from "./constants";

export const getPosts = async () => {
    try {
        const res = await axios.get(backend_url + 'post');
        return res.data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

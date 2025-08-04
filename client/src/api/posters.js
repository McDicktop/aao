import axios from "axios";
import { backend_url } from "./constants";

export const getPosters = async () => {
    try {
        const res = await axios.get(backend_url + 'poster');
        return res.data;
    } catch (e) {
        console.error(e);
        return e;
    }
}

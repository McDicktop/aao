import axios from "axios";
import { backend_url } from "./constants";

export const signin = async (email, password) => {

    try {
        const res = await axios.post(backend_url + 'auth/signin', { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res;
    } catch (e) {
        console.error('Error:', e);
        return e;
    }
}

export const signout = async () => {
    try {
        await axios.post(backend_url + 'auth/logout', {}, {
            withCredentials: true, // Важно! Для кук
        });

        console.log('Logged out successfully');
    } catch (error) {
        console.error('Error:', error);
    }
};



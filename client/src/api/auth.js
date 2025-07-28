import axios from "axios";
import { backend_url } from "./constants";



export const auth = async (email, password) => {

    const res = await fetch(backend_url + 'auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        return data;
        // refreshToken автоматически сохраняется в httpOnly куки
    } else {
        throw new Error(data.error);
    }
}

export const logout = async () => {
    try {
        await axios.post(backend_url + 'auth/logout', {}, {
            withCredentials: true, // Важно! Для кук
        });

        console.log('Logged out successfully');
    } catch (error) {
        console.error('Error:', error);
    }
};



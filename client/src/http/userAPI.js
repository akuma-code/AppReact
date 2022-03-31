
import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/reg', { email, password, role: 'ADMIN' })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        console.log('######', error.message);
    }

}

export const login = async (email, password) => {
    const { data } = await $authHost.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    try {
        console.log('check');
        const { data } = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        console.log('######', error.message);
    }

}
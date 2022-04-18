
import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, password) => {
    try {
        const { data } = await $host.post('api/user/reg', { name, password, role: 'ADMIN' })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        console.log('######', error.message);
    }

}

export const login = async (name, password) => {
    const { data } = await $authHost.post('api/user/login', { name, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    try {

        const { data } = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        console.clear()
        console.log('######', error.message);
    }

}
import { $authHost, $host } from './index'

export const registration = async (email, pass) => {
    const response = await $host.post('api/user/reg', { email, pass, role: 'ADMIN' })
    return response
}
export const login = async (email, pass) => {
    const response = await $host.post('api/user/login', { email, pass })
    return response
}
const check = async () => {
    const response = await $host.post('api/user/auth')
    return response
}
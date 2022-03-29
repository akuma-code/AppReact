
import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    console.log('data', data)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    console.log('data[fetchTypes]', data)
    return data.rows
}

export const fetchOneType = async (id) => {
    const { data } = await $host.get('api/type/' + id)
    console.log('oneType', data);
    return data
}
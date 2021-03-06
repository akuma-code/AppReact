
import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    console.log('created Type', data)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    // console.log('data[fetchTypes]', data)
    return data.rows
}

export const fetchOneType = async (id) => {
    const { data } = await $host.get(`api/type/${id}`)
    // console.log('oneType', data);
    return data
}
export const removeType = async (id) => {
    const { data } = await $host.delete('api/type/' + id)

    return data
}
export const clearTypes = async () => {
    const { data } = await $host.delete('api/type/')

    return data
}

export const editType = async (type, id) => {

    const newType = await $authHost.put(`api/type/${id}`, type)
    return newType.data
}
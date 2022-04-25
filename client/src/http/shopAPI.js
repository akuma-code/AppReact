
import { $authHost, $host } from "./index";

export const createPosition = async (pos) => {
    const { data } = await $authHost.post('api/shop', pos)
    console.log('created Position', data)
    return data
}

export const fetchPositions = async (typeId = null) => {
    const { data } = await $host.get('api/shop', { params: { typeId } })
    console.log('data[fetchPositions]', data)
    return data.rows
}

export const fetchOnePosition = async (id) => {
    const { data } = await $host.get('api/shop/' + id)
    console.log('data[OnePosition]', data)
    return data
}

export const removeShopPosition = async (id) => {
    const { data } = await $authHost.delete('api/shop/' + id)

    return data
}
export const removeSkladPosition = async (id) => {
    const { data } = await $authHost.delete('api/sklad/' + id)

    return data
}
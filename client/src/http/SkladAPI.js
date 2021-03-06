import { $authHost, $host } from "./index";

export const fetchSklad = async () => {
    const { data } = await $host.get('api/sklad')
    return data.rows
}
export const fetchOneSklad = async (id) => {
    const { data } = await $host.get('api/sklad/' + id)
    return data
}

export const createSkladPosition = async (item) => {
    const { data } = await $authHost.post('api/sklad', item)
    console.log('created Position', data)
    return data
}

export const removeSkladPosition = async (id) => {

    const data = await $authHost.delete('api/sklad/' + id)

    return data
}

export const skladClear = async () => {
    const data = await $authHost.delete('api/sklad/')

    return data
}
export const updateSkladItem = async (item) => {
    const skladItem = await $authHost.put('api/sklad/' + item.id, item)
    return skladItem.data
}

export const addToShop = async (item) => {
    const skladItem = await $authHost.put('api/sklad/' + item.id, item)
    return skladItem.data
}
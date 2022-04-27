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

export const removeSkladPosition = async (id = null) => {
    let data;
    if (!id) data = await $authHost.delete('api/sklad/')
    else data = await $authHost.delete('api/sklad/' + id)

    return data
}
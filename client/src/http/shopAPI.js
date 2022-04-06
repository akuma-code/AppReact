
import { $authHost, $host } from "./index";

export const createPosition = async (pos) => {
    const { data } = await $authHost.post('api/shop', pos)
    console.log('created Position', data)
    return data
}

export const fetchPositions = async () => {
    const { data } = await $host.get('api/shop')
    console.log('data[fetchPositions]', data)
    return data.rows
}
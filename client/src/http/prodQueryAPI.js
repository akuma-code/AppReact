import { $authHost, $host } from "./index";


export const startProdQuery = async (prodUnit) => {
    const item = await $authHost.post('api/prod', prodUnit)
    return item.data
}

export const getProdQuery = async (nested = null) => {
    const { data } = (!nested) ? await $host.get('api/prod') : await $host.get('api/prod?nested=true')
    return data.rows
}

export const clearProdQuery = async () => {
    const { data } = await $authHost.delete('api/prod')
    return data
}

export const getOneUnit = async (id) => {
    const { data } = await $host.get(`api/prod/${id}`)
    return data
}

export const deleteOneUnit = async (id) => {
    const { data } = await $authHost.delete(`api/prod/${id}`)
    return data
}

export const finishTask = async (id) => {
    const { data } = await $authHost.put(`api/prod/${id}/fin`)
    return data
}
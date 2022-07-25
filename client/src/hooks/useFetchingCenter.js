import { $host, $authHost } from "../http/index"


export class FetchingCenter {

    static async fetchAll(path = "type") {
        const { data } = await $host.get(`api/${path}`)
        return data.rows
    }

    static async fetchOne(path, id) {
        const { data } = await $host.get(`api/${path}/${id}`)
        return data
    }

    static async create(path, data) {
        const { newItem } = await $host.post(`api/${path}`, data)
        return newItem
    }

    static async remove(path, id) {

        const { data } = await $host.delete(`api/${path}/${id}`)
        return data
    }
    static async clear(path) {

        const { data } = await $host.delete(`api/${path}`)
        return data
    }
}

export class DBService {
    constructor (path = 'type') {
        this.path = path
    }
    async fetchAll() {
        const { data } = await $host.get(`api/${this.path}`)
        return data.rows
    }

}

export default new DBService('type')

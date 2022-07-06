import { makeAutoObservable } from "mobx"

export default class ProductionStore {
    constructor () {
        this._query = []
        this._task = {}
        this._dateReady = ''
        makeAutoObservable(this)
    }

    setQuery(tasks) {
        this._query = tasks
    }

    get query() {
        return this._query
    }

    async setTask(skItem) {
        const { id, quant, type: { name, img } } = skItem
        this._task = { skladId: id, name }
    }

    get task() {
        return this._task
    }

    setDate(dateReady) {
        this._dateReady = dateReady
    }

    get dateReady() {
        return this._dateReady
    }

    async addTaskToQuery(skladItem, ...options) {
        this.setTask(skladItem)
        this.setQuery([...this._query, { ...this.task, ...options }])
    }

    clearQuery() {
        this.setQuery([])
    }

    async queryPipe(tasks) {


        return this._query
    }
}
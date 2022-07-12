import { makeAutoObservable } from "mobx"

export default class ProductionStore {
    constructor () {
        this._query = []
        this._task = {}
        this._queryForm = []
        makeAutoObservable(this)
    }

    setQuery(tasks) {
        this._query = tasks
    }
    setQueryForm(query = []) {
        const makeForm = ({ skladId, number, dateReady }) => {
            const form = new FormData();
            form.append('dateReady', dateReady)
            form.append('skladId', skladId)
            form.append('number', number)
            form.append('isReady', false)
            return form
        }

        this._queryForm = query.map(i => makeForm(i))
    }
    get queryForm() {
        return this._queryForm
    }
    get query() {
        return this._query
    }

    async setTask(skladItem) {
        const { id, quant, type: { name, img } } = skladItem
        this._task = { skladId: id, name, dateReady: "", number: "" }
    }

    get task() {
        return this._task
    }



    async addTaskToQuery(skladItem, options) {
        this.setTask(skladItem)
        this.setQuery([...this._query, { ...this.task, ...options }])
    }

    clearQuery() {
        this.setQuery([])
    }

    async queryPipe(tasks) {


        return this._query
    }

    changeNumber(value, id) {
        //! queryItem{skladId, name, number, dateReady}
        this.setQuery(this.query.map(queryItem => queryItem.skladId === id ? { ...queryItem, number: value } : queryItem))
    }
    changeDate(value, id) {
        //! queryItem{skladId, name, number, dateReady}
        this.setQuery(this.query.map(queryItem => queryItem.skladId === id ? { ...queryItem, dateReady: value } : queryItem))
    }

    setDate(date) {
        this.setQuery(this.query.map(qi => ({ ...qi, dateReady: date })))
    }

    submitQuery() {
        this.setQueryForm(this.query)
        this.clearQuery()
    }
}
import { makeAutoObservable } from "mobx"

export default class ProdQueryStore {
    constructor () {
        this._prodQuery = []
        makeAutoObservable(this)
    }

    setProdQuery(prodquery) {
        return this._prodQuery = prodquery
    }

    get prodQuery() {
        return this._prodQuery
    }
}
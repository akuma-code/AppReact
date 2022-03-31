import { makeAutoObservable } from 'mobx'


export default class OgoStore {
    constructor () {
        this._types = []
        this._amount = [
            { id: 1, type: "OK1", count: 5 },
            { id: 2, type: "OK2", count: 5 },
            { id: 3, type: "OK3", count: 5 },

        ]
        this._shop = []
        this._type = {}
        this._selectedType = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setType(type) {
        this._type = type
    }
    setShop(type) {
        this._shop = type
    }
    setAmount(amount) {
        this._amount = amount
    }

    get types() {
        return this._types
    }
    get type() {
        return this._type
    }
    get amount() {
        return this._amount
    }
    get shop() {
        return this._shop
    }

    setSelectedType(type) {
        this._selectedType = type
    }
    get selectedType() {
        return this._selectedType
    }


}
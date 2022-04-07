import { makeAutoObservable } from 'mobx'


export default class OgoStore {
    constructor () {
        this._types = []
        this._amount = []
        this._shop = []
        this._sortType = {}
        this._selectedType = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setSortType(type) {
        this._sortType = type
    }
    setShop(type) {
        this._shop = type
    }
    setAmount(amount) {
        this._amount = amount
    }
    setSelectedType(type) {
        this._selectedType = type
    }


    get types() {
        return this._types
    }
    get sortType() {
        return this._sortType
    }
    get amount() {
        return this._amount
    }
    get shop() {
        return this._shop
    }

    get selectedType() {
        return this._selectedType
    }


}
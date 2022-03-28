import { makeAutoObservable } from 'mobx'


export default class OgoStore {
    constructor () {
        this._types = [
            // { id: 1, type: "OK1", price: 5100, img: "" },
            // { id: 2, type: "OK2", price: 4500, img: "" },
            // { id: 3, type: "OK3", price: 8100, img: "" },
        ]
        this._amount = [
            { id: 1, type: "OK1", count: 5 },
            { id: 2, type: "OK2", count: 5 },
            { id: 3, type: "OK3", count: 5 },

        ]
        this._selectedType = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setAmount(amount) {
        this._amount = amount
    }

    get types() {
        return this._types
    }
    get amount() {
        return this._amount
    }


    setSelectedType(type) {
        this._selectedType = type
    }
    get selectedType() {
        return this._selectedType
    }


}
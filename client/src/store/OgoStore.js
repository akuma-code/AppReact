import { makeAutoObservable } from 'mobx'


export default class OgoStore {
    constructor () {
        this._types = [
            { id: 1, type: "OK1", price: 5100, img: "none" },
            { id: 2, type: "OK2", price: 4500, img: "none" },
            { id: 3, type: "OK3", price: 8100, img: "none" },
        ]
        this._amount = [
            { id: 1, type: "OK1", count: 5 },
            { id: 2, type: "OK2", count: 5 },
            { id: 3, type: "OK3", count: 5 },
        ]
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
}
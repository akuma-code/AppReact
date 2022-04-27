import { makeAutoObservable } from 'mobx'


export default class ShopStore {
    constructor () {

        this._quant = []
        this._shop = []
        makeAutoObservable(this)
    }


    setShop(type) {
        this._shop = type
    }
    setQuant(quant) {
        this._quant = quant
    }


    get quant() {
        return this._quant
    }
    get shop() {
        return this._shop
    }

}
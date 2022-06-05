import { makeAutoObservable } from 'mobx'


export default class ShopStore {
    constructor () {

        this._quant = []
        this._shopItems = []
        makeAutoObservable(this)
    }


    setShopItems(items) {
        this._shopItems = items
    }
    setQuant(quant) {
        this._quant = quant
    }


    get quant() {
        return this._quant
    }
    get shopItems() {
        return this._shopItems
    }

}
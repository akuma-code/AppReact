import { makeAutoObservable } from 'mobx'


export default class ShopStore {
    constructor () {

        this._activeItem = {}
        this._shopItems = []
        makeAutoObservable(this)
    }


    setShopItems(items) {
        return this._shopItems = items
    }
    setActiveItem(item) {
        return this._activeItem = item
    }


    get activeItem() {
        return this._activeItem
    }
    get shopItems() {
        return this._shopItems
    }

}
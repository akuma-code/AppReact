import { makeAutoObservable } from 'mobx'


export default class ShopStore {
    constructor () {

        this._selectedItem = {}
        this._shopItems = []
        makeAutoObservable(this)
    }


    setShopItems(items = []) {
        return this._shopItems = items
    }
    setSelectedItem(item = {}) {
        return this._selectedItem = item
    }


    get selectedItem() {
        return this._selectedItem
    }
    get shopItems() {
        return this._shopItems
    }

}
import { makeAutoObservable } from 'mobx'


export default class SkladStore {
    constructor () {
        this._skladItems = []
        this._total = []
        this._shop = []
        this._selectedItem = {}
        makeAutoObservable(this)
    }

    setSkladItems(skladItems) {
        this._skladItems = skladItems
    }

    setTotal(total) {
        this._total = total
    }
    setShop(shop) {
        this._shop = shop
    }
    setSelectedItem(item) {
        this._selectedItem = item
    }

    get skladItems() {
        return this._skladItems
    }
    get total() {
        return this._total
    }
    get shop() {
        return this._shop
    }
    get selectedItem() {
        return this._selectedItem
    }

}
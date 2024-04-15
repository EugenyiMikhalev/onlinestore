import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._users = []
        this._page = 1
        this._totalCount = 0
        this._basket = []
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setUsers(users) {
        this._users = users
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }
    setBasket(basket) {
        this._basket = basket
    }
    get isAuth() {
        return this._isAuth
    }

    get users() {
        return this._users
    }

    get user() {
        return this._user
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }
    
    get basket() {
        return this._basket
    }
}
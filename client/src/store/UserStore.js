import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._users = []
        this._page = 1
        this._totalCount = 0
        this._cart = []
        this._cartUpdated = false
        this._wishlist = []
        this._wishlistUpdated = false
        makeAutoObservable(this);

        // Load cart from localStorage when the store is created
        this.loadCartFromLocalStorage();
        this.loadWishlistFromLocalStorage();

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
    setCart(cart) {
        this._cart = cart;
        this.saveCartToLocalStorage();
    }
    setCartUpdated(cartUpdated) {
        this._cartUpdated = cartUpdated
    }

    setWishlist(wishlist) {
        this._wishlist = wishlist;
        this.saveWishlistToLocalStorage();
    }
    setWishlistUpdated(wishlistUpdated) {
        this._wishlistUpdated = wishlistUpdated
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
    
    get cart() {
        return this._cart
    }
    get cartUpdated() {
        return this._cartUpdated
    }

    get wishlist() {
        return this._wishlist
    }
    get wishlistUpdated() {
        return this._wishlistUpdated
    }
    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this._cart));
        localStorage.setItem('cartUpdated', JSON.stringify(this._cartUpdated));
        console.log('cart saved to local storage: ', this._cart)
    }

    saveWishlistToLocalStorage() {
        localStorage.setItem('wishlist', JSON.stringify(this._wishlist));
        localStorage.setItem('wishlistUpdated', JSON.stringify(this._wishlistUpdated));
        console.log('wishlist saved to local storage: ', this._wishlist)
    }

    loadCartFromLocalStorage() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartUpdated = JSON.parse(localStorage.getItem('cartUpdated'));

        if (cart) {
            this._cart = cart;
        }

        if (cartUpdated !== null) {
            this._cartUpdated = cartUpdated;
        }
        console.log('cart loaded from local storage: ', this._cart)

    }

    loadWishlistFromLocalStorage() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist'));
        const wishlistUpdated = JSON.parse(localStorage.getItem('wishlistUpdated'));

        if (wishlist) {
            this._wishlist = wishlist;
        }

        if (wishlistUpdated !== null) {
            this._wishlistUpdated = wishlistUpdated;
        }
        console.log('wishlist loaded from local storage: ', this._wishlist)

    }
}
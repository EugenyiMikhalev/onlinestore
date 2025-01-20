import { ABOUT_ROUTE, ADMIN_ROUTE, WISHLIST_ROUTE, CART_ROUTE, CHECKOUT_ROUTE, CONTACT_ROUTE, DEVICE_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts"
import Admin from "./pages/Admin"
// import Basket from "./pages/Basket"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import DevicePage from "./pages/DevicePage"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Wishlist from "./pages/Wishlist"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: WISHLIST_ROUTE,
        Component: Wishlist
    },
    {
        path: CHECKOUT_ROUTE,
        Component: Checkout
    }
]

export const publickRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: CONTACT_ROUTE,
        Component: Contact
    }
]

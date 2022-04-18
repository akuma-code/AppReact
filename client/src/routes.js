import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import Shop from "./pages/Shop"
import Login from "./pages/Login"
import { ADMIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE, AUTH_ROUTE, LOGIN_ROUTE, REG_ROUTE, OKNO_ROUTE, TYPE_ROUTE, DB_ROUTE, PROD_ROUTE, SKLAD_ROUTE } from "./utils/consts"
import OknoPage from "./pages/OknoPage"
import Types from "./pages/Types"
import DBPage from "./pages/DBPage"
import Store from './pages/Store'
import Prod from './pages/Production'
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: DB_ROUTE,
        Component: DBPage
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REG_ROUTE,
        Component: Auth
    },
    {
        path: OKNO_ROUTE,
        Component: OknoPage
    },
    {
        path: OKNO_ROUTE + '/:id',
        Component: OknoPage
    },
    {
        path: TYPE_ROUTE,
        Component: Types
    },
    {
        path: PROD_ROUTE,
        Component: Prod
    },
    {
        path: SKLAD_ROUTE,
        Component: Store
    },
]

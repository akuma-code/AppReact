import React, { useContext } from 'react'
import { Route, Switch, NavLink, Link, Redirect } from 'react-router-dom'
import { Context } from "../index"
import Homepage from '../pages/HomePage'
import { authRoutes, publicRoutes } from "../routes"
import { SHOP_ROUTE, HOMEPAGE_ROUTE } from "../utils/consts"

const AppRouter = () => {
    const { user } = useContext(Context)
    return (
        <Switch>

            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route path={path}
                    component={Component}
                    key={path}
                    exact
                />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route path={path}
                    component={Component}
                    key={path}
                    exact
                />
            )}
            <Redirect to={Homepage} />
        </Switch>
    )
}

export default AppRouter
import React from 'react'
import { NavLink } from "react-router-dom"
import { SHOP_ROUTE } from "../../utils/consts"

const NavbarBTS = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid" style={ { display: 'flex', justifyContent: 'space-between', flexDirection: 'row' } }>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">STORE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Production</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">LOGIN</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">LOGOUT</a>
                        </li>
                    </ul>
                </div>
                <NavLink to={ SHOP_ROUTE } style={ { color: 'white', fontSize: '1.3em', marginRight: 30 } }>СКЛАД ГОТОВЫХ ОКОН</NavLink>
            </div>
        </nav>
    )
}

export default NavbarBTS
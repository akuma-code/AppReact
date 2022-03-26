import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { SHOP_ROUTE } from "../../utils/consts"
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { Context } from '../../index.js'


const NavbarBT = () => {
    const user = useContext(Context).user

    return (
        <Navbar bg="dark" variant="dark"  >
            <NavLink className="ml-0 container" style={{ color: 'white', paddingLeft: 45, fontSize: '1.4em' }} to={SHOP_ROUTE}
            >
                СКЛАДСКИЕ ОСТАТКИ
            </NavLink>

            {user.isAuth ?
                <Container className="mr-auto">
                    <Nav >
                        <Button variant={"outline-light"} style={{ marginRight: 10 }}>Авторизация</Button>
                        <Button variant={"outline-light"} style={{ marginRight: 10 }}>Админка</Button>
                        <Button variant={"outline-light"} style={{ marginRight: 10 }}>Выход</Button>
                    </Nav>
                </Container>
                : <Container className="mr-auto">
                    <Nav >
                        <Button variant={"outline-light"} style={{ marginRight: 10 }} >Авторизация</Button>
                        <Button variant={"outline-light"} style={{ marginRight: 10 }} disabled>Админка</Button>
                        <Button variant={"outline-light"} style={{ marginRight: 10 }} disabled>Выход</Button>
                    </Nav>
                </Container>
            }


        </Navbar>

    )
}

export default NavbarBT
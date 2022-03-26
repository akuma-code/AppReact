import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { ADMIN_ROUTE, AUTH_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts"
import { Navbar, Nav, Button, Container, Row } from 'react-bootstrap'
import { Context } from '../../index.js'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

const NavbarBT = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()
    return (
        <Navbar bg="dark" variant="dark"  >
            <Container>

                <NavLink className="ml-0 container" style={{ color: 'white', paddingLeft: 45, fontSize: '1.4em' }} to={SHOP_ROUTE}
                >
                    СКЛАДСКИЕ ОСТАТКИ
                </NavLink>

                {user.isAuth ?
                    <Container className="mr-auto">
                        <Nav >
                            <Button
                                variant={"outline-light"}
                                onClick={() => history.push(ADMIN_ROUTE)}
                                className="mr-0"
                            >Админка
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => history.push(LOGIN_ROUTE)}
                                className="mr-5"
                            >Регистрация
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => history.push(LOGIN_ROUTE)}
                                className="mr-5"
                            >Выход
                            </Button>
                        </Nav>
                    </Container>
                    : <Container className="mr-auto">
                        <Nav >
                            <Button
                                variant={"outline-light"}
                                onClick={() => history.push(ADMIN_ROUTE)}
                                className="mr-0"
                                disabled
                            >Админка
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => history.push(AUTH_ROUTE)}
                                className="mr-5"
                            >Авторизация
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => history.push(LOGIN_ROUTE)}
                                className="mr-5"
                            >Выход
                            </Button>
                        </Nav>
                    </Container>
                }
            </Container>


        </Navbar>

    )
}
)
export default NavbarBT
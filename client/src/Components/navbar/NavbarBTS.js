import React, { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { ADMIN_ROUTE, AUTH_ROUTE, HOMEPAGE_ROUTE, LOGIN_ROUTE, PROD_ROUTE, SHOP_ROUTE } from "../../utils/consts"
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap'
import { Context } from '../../index.js'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import ProductionModal from "../../pages/ProductionModal"


const NavbarBT = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()
    const [showProd, setShowProd] = useState(false);

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark"  >

            <Col className="d-flex justify-content-start gap-5">

                <NavLink className="mx-3" style={ { color: 'white', fontSize: '1.4em' } } to={ HOMEPAGE_ROUTE }
                >
                    HOMEPAGE
                </NavLink>
                <NavLink className="mx-3 " style={ { color: 'white', fontSize: '1.4em' } } to={ SHOP_ROUTE }
                >
                    Магазин
                </NavLink>
                <NavLink className="mx-3 " style={ { color: 'white', fontSize: '1.4em' } } to={ PROD_ROUTE }
                >
                    Очередь производства
                </NavLink>
            </Col>
            <Col>



                { user.isAuth ?
                    <Nav >
                        <Button
                            variant={ "outline-light" }
                            onClick={ () => setShowProd(true) }
                            className="mr-0"
                        >ProdModal
                        </Button>
                        <Button
                            variant={ "outline-light" }
                            onClick={ () => history.push(ADMIN_ROUTE) }
                            className="mr-0"
                        >Админка
                        </Button>
                        <Button
                            variant={ "outline-light" }
                            onClick={ () => history.push(LOGIN_ROUTE) }
                            className="mr-5"
                        >Регистрация
                        </Button>
                        <Button
                            variant={ "outline-light" }
                            onClick={ logout }
                            className="mr-5"
                        >Выход
                        </Button>
                    </Nav>
                    : <Nav >
                        <Button
                            variant={ "outline-light" }
                            onClick={ () => history.push(ADMIN_ROUTE) }
                            className="mr-0"
                            disabled
                        >Админка
                        </Button>
                        <Button
                            variant={ "outline-light" }
                            onClick={ () => history.push(LOGIN_ROUTE) }
                            className="mr-5"
                        >Авторизация
                        </Button>
                        <Button
                            variant={ "outline-light" }
                            onClick={ logout }
                            className="mr-5"
                        >Выход
                        </Button>
                    </Nav>
                }

            </Col>
            <ProductionModal show={ showProd } onHide={ () => setShowProd(false) } />
        </Navbar>

    )
}
)
export default NavbarBT
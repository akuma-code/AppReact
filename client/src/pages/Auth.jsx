import { observer } from "mobx-react-lite"
import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from "react-bootstrap"
import { NavLink, useHistory, useLocation } from "react-router-dom"
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REG_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { Context } from '../index'



const Auth = observer(() => {
    const location = useLocation()
    const { user } = useContext(Context)
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(isLogin);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('')

    const clickHandler = async (name, pass) => {
        let data

        try {
            if (isLogin) {
                data = await login(name, pass)
            } else {
                data = await registration(name, pass)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
            return data
        } catch (e) {

            alert(e.response.data.ApiError)
        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
            style={ { height: window.innerHeight - 54 } }
        >
            <Card style={ { width: 600 } } className="p-5">
                <h2 className="m-auto">{ isLogin ? 'Войти' : 'Регистрация' }</h2>
                <Form className="d-flex flex-column"                >
                    <Form.Control
                        placeholder="input name"
                        className="mt-3"
                        onChange={ (e) => setName(e.target.value) }
                        value={ name }
                        autoComplete="true"
                    />
                    <Form.Control
                        placeholder="input password"
                        className="mt-3"
                        type="password"
                        autoComplete="true"
                        onChange={ (e) => setPass(e.target.value) }
                        value={ pass }
                    />
                    <Row className="d-flex mt-3 justify-content-between" >
                        <Button
                            onClick={ () => clickHandler(name, pass) }
                            className="m-3 pr-3"
                            variant={ "outline-success" }
                        >
                            { isLogin ? "Войти" : "Зарегистрировать" }
                        </Button>
                        <NavLink
                            to={ REG_ROUTE }
                            className="mt-1">
                            { isLogin ? "Регистрация нового пользователя" : "" }
                        </NavLink>
                    </Row>
                </Form>

            </Card>

        </Container>
    )
})

export default Auth
import React from 'react'
import { Button, Card, Container, Form, Row } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { LOGIN_ROUTE, REG_ROUTE } from "../utils/consts"

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container className="d-flex justify-content-center align-items-center"
            style={ { height: window.innerHeight - 54 } }
        >
            <Card style={ { width: 600 } } className="p-5">
                <h2 className="m-auto">{ isLogin ? 'Авторизация' : 'Регистрация' }</h2>
                <Form className="d-flex flex-column"                >
                    <Form.Control
                        placeholder="input email"
                        className="mt-3"
                    />
                    <Form.Control
                        placeholder="input password"
                        className="mt-3"
                        type="password"
                        autoComplete="true"
                    />
                    <Row className="d-flex mt-3 justify-content-between" >
                        <Button
                            className="m-3 pr-3"
                            variant={ "outline-success" }
                        >
                            { !isLogin ? "Зарегистрировать" : "Войти" }
                        </Button>
                        <NavLink to={ REG_ROUTE }
                            className="mt-1">
                            { isLogin ? "Регистрация нового пользователя" : "" }
                        </NavLink>
                    </Row>
                </Form>

            </Card>

        </Container>
    )
}

export default Auth
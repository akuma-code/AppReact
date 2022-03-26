import React, { useState } from 'react'
import { Button, Card, Container, Form, Row } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REG_ROUTE } from "../utils/consts"

const Auth = () => {
    const location = useLocation()
    console.log(location.pathname);
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')

    const clickHandler = async (email, pass) => {

        if (isLogin) {
            const response = await login(email, pass)
            console.log('login');
            return response

        } else {
            console.log('reg')
            const response = await registration(email, pass)
            return response

        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Войти' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column"                >
                    <Form.Control
                        placeholder="input email"
                        className="mt-3"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Form.Control
                        placeholder="input password"
                        className="mt-3"
                        type="password"
                        autoComplete="true"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                    />
                    <Row className="d-flex mt-3 justify-content-between" >
                        <Button
                            onClick={() => clickHandler(email, pass)}
                            className="m-3 pr-3"
                            variant={"outline-success"}
                        >
                            {isLogin ? "Войти" : "Зарегистрировать"}
                        </Button>
                        <NavLink to={REG_ROUTE}
                            className="mt-1">
                            {isLogin ? "Регистрация нового пользователя" : ""}
                        </NavLink>
                    </Row>
                </Form>

            </Card>

        </Container>
    )
}

export default Auth
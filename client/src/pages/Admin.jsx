import React, { useState } from 'react'
import { Button, Container } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
import CreateType from "../Components/modals/CreateType"
import { DB_ROUTE } from '../utils/consts'


const Admin = () => {
    const history = useHistory()


    return (
        <Container className="d-flex flex-column mt-4">

            <Button
                className="btn btn-danger mt-2"
                variant={"outline-dark"}
                onClick={() => history.push(DB_ROUTE)}
            >
                Работа с БД
            </Button>
            <Button disabled
                className="btn btn-secondary mt-2"
                variant={"outline-dark"}
            >
                Production Service
            </Button>

        </Container>
    )
}

export default Admin
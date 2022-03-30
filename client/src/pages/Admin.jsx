import React, { useState } from 'react'
import { Button, Container } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
import CreateType from "../Components/modals/CreateType"
import { DB_ROUTE } from '../utils/consts'

const Admin = () => {
    const history = useHistory()
    const [typeVisible, setTypeVisible] = useState(false);
    return (
        <Container className="d-flex flex-column mt-4">
            <Button
                className="btn btn-success mt-2"
                variant={"outline-dark"}
                onClick={() => setTypeVisible(true)}
            >
                Добавить новый тип окна
            </Button>
            <Button
                className="btn btn-danger mt-2"
                variant={"outline-dark"}
                onClick={() => history.push(DB_ROUTE)}
            >
                Работа с БД
            </Button>
            <Button
                className="btn btn-secondary mt-2"
                variant={"outline-dark"}
            >
                Еще чето на всякий случай
            </Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    )
}

export default Admin
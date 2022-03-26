import React, { useState } from 'react'
import { Button, Container } from "react-bootstrap"
import CreateType from "../Components/modals/CreateType"

const Admin = () => {
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
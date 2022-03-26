import React, { useState } from 'react'
import { Button, Container } from "react-bootstrap"
import CreateType from "../Components/modals/CreateType"

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    return (
        <Container className="d-flex flex-column mt-4">
            <Button className="btn btn-primary" variant={ "outlined" }
                onClick={ () => setTypeVisible(true) }
            >Добавить новый тип окна</Button>
            <Button variant={ "outlined" } disabled>Список пользователей</Button>
            <Button variant={ "outlined" } disabled>Еще чето на всякий случай</Button>
            <CreateType show={ typeVisible } onHide={ () => setTypeVisible(false) } />
        </Container>
    )
}

export default Admin
import React, { useState } from 'react'
import { Button, Card, Col, Container, FormControl, Row, Spinner } from "react-bootstrap"
import NewOffer from "../Components/modals/NewOffer"



export const OffersPage = () => {
    const [showNO, setShowNO] = useState(false)
    const onHide = () => setShowNO(false)
    return (
        <Container fluid
            className="mt-1">
            <Row>
                <Col md={ 1 }>
                    <Button onClick={ () => setShowNO(prev => !prev) }>
                        Создать заявку
                    </Button>
                </Col>
                <Col md={ 4 }>
                    Offers
                </Col>
            </Row>
            <NewOffer show={ showNO } onHide={ onHide } />
        </Container>

    )
}

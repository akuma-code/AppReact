import React from 'react'
import { Col, Container, Row } from "react-bootstrap"
import OkList from "../Components/OkList"
import TypeBar from "../Components/TypeBar"

const Shop = () => {
    return (
        <Container>
            <Row>
                <Col md={ 3 }>
                    <TypeBar />
                </Col>
                <Col md={ 2 }>
                    <OkList></OkList>
                </Col>
            </Row>
        </Container>
    )
}

export default Shop
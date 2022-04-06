import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { Context } from '..'
import OkList from "../Components/OkList"
import TypeBar from "../Components/TypeBar"
import { fetchPositions } from "../http/shopAPI"
import { fetchTypes } from '../http/typesAPI'

const Shop = observer(() => {


    const { ogo } = useContext(Context)


    useEffect(() => {
        fetchPositions().then(data => {

            ogo.setShop(data)
        })
    }, [])

    return (
        <Container>
            <Row>
                <Col md={ 3 }>
                    <TypeBar />
                </Col>
                <Col
                    md={ 2 }
                >
                    <OkList items={ ogo.shop } />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop
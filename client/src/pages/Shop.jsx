import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { Context } from '..'
import OkList from "../Components/OkList"
import TypeBar from "../Components/TypeBar"
import { fetchTypes } from '../http/typesAPI'

const Shop = observer(() => {


    const { ogo } = useContext(Context)


    useEffect(() => {
        fetchTypes().then(data => ogo.setTypes(data))
    }, [])


    return (
        <Container>
            <Row>
                <Col md={ 3 }>
                    <TypeBar />
                </Col>
                <Col md={ 2 }>
                    <OkList />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop
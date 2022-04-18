import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { Context } from '..'
import OkList from "../Components/OkList.jsx"
import TypeBar from "../Components/TypeBar"
import { fetchPositions } from "../http/shopAPI"
import { fetchTypes } from '../http/typesAPI'
import ProductionBasket from '../Components/modals/ProductionBasket.js'



const Shop = observer(() => {

    const [addProdVisible, setAddProdVisible] = useState(false);
    const { ogo } = useContext(Context)


    useEffect(() => {
        fetchPositions().then(data => {
            ogo.setShop(data)
        })
    }, [])
    useEffect(() => {
        fetchPositions(ogo.sortType.id).then(data => {
            ogo.setShop(data)
        })
    }, [ogo.sortType])

    return (
        <Container>
            <Row>
                <Col md={ 2 }>
                    <TypeBar />
                    <Button
                        onClick={ () => setAddProdVisible(true) }
                    >
                        ProdService
                    </Button>
                </Col>
                <Col md={ 10 } >
                    <OkList items={ ogo.shop } />
                </Col>
            </Row>
            <ProductionBasket
                show={ addProdVisible }
                onHide={ () => setAddProdVisible(false) }
            />
        </Container>
    )
})

export default Shop
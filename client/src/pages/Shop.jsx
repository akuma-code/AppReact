import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { Context } from '..'
import OkList from "../Components/OkList.jsx"
import TypeBar from "../Components/TypeBar"
import { fetchPositions } from "../http/shopAPI"
import { fetchTypes } from '../http/typesAPI'
import ProductionBasket from '../Components/modals/ProductionBasket.js'
import { fetchSklad } from "../http/prodQueryAPI"



const Shop = observer(() => {

    const [addProdVisible, setAddProdVisible] = useState(false);
    const { ogo } = useContext(Context)
    const { sklad } = useContext(Context)

    useEffect(() => {
        fetchSklad().then(data => {
            sklad.setSkladItems(data)
        })
        fetchPositions().then(data => {
            ogo.setShop(data)
        })
    }, [])
    useEffect(() => {
        fetchSklad(ogo.sortType.id).then(data => {
            sklad.setSkladItems(data)
        })
    }, [ogo.sortType])

    return (
        <Container>
            <Row>

                <Col md={2}>
                    <TypeBar />
                    <Button
                        onClick={() => setAddProdVisible(true)}
                    >
                        ProdService
                    </Button>
                </Col>
                <Col md={10} >
                    <h3>Главная страница</h3>
                    <OkList items={sklad.skladItems} />
                </Col>

            </Row>
            <ProductionBasket
                show={addProdVisible}
                onHide={() => setAddProdVisible(false)}
            />
        </Container>
    )
})

export default Shop
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { Context } from '..'
import OkList from "../Components/OkList.jsx"
import TypeBar from "../Components/TypeBar"
import { fetchPositions } from "../http/shopAPI"
import { fetchTypes } from '../http/typesAPI'
import ProductionBasket from '../Components/modals/ProductionBasket.js'
import { fetchSklad } from "../http/SkladAPI"



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

        <Row>

            <Col md={ 2 } >
                <TypeBar />

            </Col>
            <Col md={ 10 } >
                <Row>

                    <h3>Главная страница</h3>
                    <OkList items={ sklad.skladItems } />
                </Row>
            </Col>

            <ProductionBasket
                show={ addProdVisible }
                onHide={ () => setAddProdVisible(false) }
            />
        </Row>

    )
})

export default Shop
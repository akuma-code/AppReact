import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import ShopCard from "../../Components/UI/card/ShopCard";
import { useCallCount } from "../../hooks/useConsole";
import { fetchPositions } from "../../http/shopAPI";


const ShopTab = observer(() => {
    const { shop } = useContext(Context);
    const [shopItems, setShopItems] = useState([])

    useLayoutEffect(() => {
        fetchPositions().then(data => setShopItems(data))
        fetchPositions().then(data => shop.setShopItems(data))
    }, [])
    return (
        <Container fluid>
            <Row>
                <Col md={ 1 }>

                </Col>
                <Col md={ { offset: 0 } }>
                    { shopItems && shopItems.map((item, id) =>
                        <ShopCard shopItem={ item } key={ id } />) }
                </Col>
            </Row>
        </Container>
    );
})

export default ShopTab;

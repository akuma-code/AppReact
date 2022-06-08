import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import SideBarShop from "../../Components/sidebar/SideBarShop";
import ShopCard from "../../Components/UI/card/ShopCard";
import { useStoreRefresh } from '../../hooks/useStoreRefresh';
import { fetchPositions } from "../../http/shopAPI";
import { clearShop } from "../../http/shopAPI"


const ShopTab = observer(() => {
    const { shop } = useContext(Context);
    const [shopItems, setShopItems] = useState([])
    const [update, isLoading, error] = useStoreRefresh(fetchPositions, setShopItems)
    const isConfirmed = (text) => confirm(text)
    const clearAll = () => isConfirmed("Убрать все с витрины") ? clearShop().then(data => setShopItems([])) : null

    useLayoutEffect(() => {
        fetchPositions().then(data => setShopItems(data))
        fetchPositions().then(data => shop.setShopItems(data))
    }, [])


    return (
        <Container fluid>
            <Row>
                <Col md={ 1 } bg='dark'>
                    <SideBarShop></SideBarShop>
                </Col>
                <Col md={ { offset: 0 } }>
                    <Row>
                        { shopItems && shopItems.map((item, id) =>
                            <ShopCard shopItem={ item } key={ id } />) }
                    </Row>

                </Col>
            </Row>
        </Container>
    );
})

export default ShopTab;

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import SideBarShop from "../../Components/sidebar/SideBarShop";
import ShopCard from "../../Components/UI/card/ShopCard";
import { useDBService, useStoreRefresh } from '../../hooks/useStoreRefresh';
import { fetchPositions } from "../../http/shopAPI";
import { clearShop } from "../../http/shopAPI"
import { DBService, FetchingCenter } from '../../hooks/useFetchingCenter'
import { useConsole, useSpyState } from '../../hooks/useConsole';

const ShopTab = () => {
    const { shop, sklad, ogo } = useContext(Context);
    const [shopItems, setShopItems] = useState([])
    const [Sklad, setSklad] = useState([])
    const [types, setTypes] = useState([]);
    const [getTypes, isLoadTypes, error] = useStoreRefresh(FetchingCenter.fetchAll, setTypes)
    const [getSklad, isLoadSklad, errorSklad] = useStoreRefresh(FetchingCenter.fetchAll, setSklad)
    useEffect(() => {
        getTypes('type')
        getSklad('sklad')
        console.log(Object.entries(types))
    }, []);
    return (
        <Container fluid>
            <Row>
                <Col md={ 1 } bg='dark'>
                    <SideBarShop></SideBarShop>
                </Col>
                <Col md={ { offset: 0 } }>
                    <Row>
                        { Sklad.map(s =>
                            <ShopCard shopItem={ s } key={ s.id }></ShopCard>) }
                    </Row>

                </Col>
            </Row>
        </Container>
    );
}

export default ShopTab;

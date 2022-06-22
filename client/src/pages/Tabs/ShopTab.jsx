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

const ShopTab = observer(() => {
    const { shop, sklad } = useContext(Context);
    const [shopItems, setShopItems] = useState([])
    const [Sklad, setSklad] = useState([])
    const [types, setTypes] = useState([]);
    const [getSklad, isLoadSklad, errorSklad] = useStoreRefresh(FetchingCenter.fetchAll, setSklad)
    const [getShop, isLoadShop, errorShop] = useStoreRefresh(FetchingCenter.fetchAll, setShopItems)
    useLayoutEffect(() => {
        // FetchingCenter.fetchAll('sklad').then(data => setShopItems(data.filter(s => s.shop !== null)))
        getSklad('sklad')

    }, []);

    useEffect(() => {
        // setShopItems(Sklad.filter(s => s.shop !== null))
        getShop('shop')
    }, [sklad.SkladItems, shop.shopItems])
    return (
        <Container fluid>
            <Row>
                <Col md={ 1 } bg='dark'>
                    <SideBarShop getShops={ getShop }></SideBarShop>
                </Col>
                <Col md={ { offset: 0 } }>
                    <Row>
                        { shopItems.map(s => <ShopCard shopItem={ s } key={ s.id }></ShopCard>
                        ) }
                    </Row>

                </Col>
            </Row>
        </Container>
    );
})

export default ShopTab;

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Col, Fade, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Context } from '..';
import OkList from '../Components/OkList';
import { useCallCount } from '../hooks/useConsole';
import { useStoreRefresh } from "../hooks/useStoreRefresh";
import { fetchPositions } from '../http/shopAPI';
import { fetchOneSklad, fetchSklad, removeSkladPosition } from "../http/SkladAPI";
import { fetchTypes } from '../http/typesAPI';
import ShopTab from './Tabs/ShopTab';
import SkladTab from "./Tabs/SkladTab";
import TypesTab from "./Tabs/TypesTab";



const Homepage = observer(() => {
    const { sklad, ogo, shop } = useContext(Context)
    const [skladItems, setSkladItems] = useState([]);
    const [types, setTypes] = useState([]);
    const [shopItems, setShopItems] = useState([]);

    const hpCounter = useCallCount("homepage")
    const [refSklad, isSkLoading, errSK] = useStoreRefresh(fetchSklad, sklad.setSkladItems)
    const [refreshTypes, isLoadingTypes, errorType] = useStoreRefresh(fetchTypes, ogo.setTypes)


    // useEffect(() => {
    //     refSklad()
    //     refreshTypes()
    //     // fetchSklad().then(data => sklad.setSkladItems(data))
    //     // fetchTypes().then(data => ogo.setTypes(data))
    //     fetchPositions().then(data => shop.setShopItems(data))
    //     hpCounter("home/useEffect")
    // }, []);

    // useLayoutEffect(() => {
    //     setShopItems(shop.shopItems)
    //     setSkladItems(sklad.skladItems)
    //     setTypes(ogo.types)
    // }, [ogo.types, sklad.skladItems])
    return (
        <Tabs
            defaultActiveKey="type"
            transition={ true }
            className="mb-3 mx-5"
        >

            <Tab eventKey="type" title="Типы" className="mx-5">
                <TypesTab />
            </Tab>
            <Tab eventKey="sklad" title="Склад">
                <SkladTab />

            </Tab>
            <Tab eventKey="shop" title="Витрина">
                <ShopTab />
            </Tab>
            <Tab
                title={
                    isLoadingTypes &&
                    <Spinner animation="border" role="status" size="lg" className="mx-auto">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                eventKey="selectedItem" />


        </Tabs>
    );
})

export default Homepage;

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Fade, Tab, Tabs } from 'react-bootstrap';
import { Context } from '..';
import OkList from '../Components/OkList';
import { useCallCount } from '../hooks/useConsole';
import { fetchPositions } from '../http/shopAPI';
import { fetchOneSklad, fetchSklad, removeSkladPosition } from "../http/SkladAPI";
import { fetchTypes } from '../http/typesAPI';
import ShopTab from './Tabs/ShopTab';
import SkladTab from "./Tabs/SkladTab";
import TypesTab from "./Tabs/TypesTab";



const Homepage = observer(() => {
    const { sklad, ogo, shop } = useContext(Context)

    const hpCounter = useCallCount("homepage")

    useEffect(() => {
        fetchSklad().then(data => sklad.setSkladItems(data))
        fetchTypes().then(data => ogo.setTypes(data))
        fetchPositions().then(data => shop.setShopItems(data))
        hpCounter("home/useEffect")
    }, []);
    return (
        <Tabs
            defaultActiveKey="type"
            transition={true}
            className="mb-3 mx-5"
        >

            <Tab eventKey="type" title="Типы" className="mx-5">
                <TypesTab />
            </Tab>
            <Tab eventKey="sklad" title="Склад">
                <SkladTab skladItems={sklad.skladItems} />

            </Tab>
            <Tab eventKey="shop" title="Витрина">
                <ShopTab
                    shopItmes={shop.shopItmes}
                />
            </Tab>
        </Tabs>
    );
})

export default Homepage;

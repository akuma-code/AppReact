import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Fade, Tab, Tabs } from 'react-bootstrap';
import { Context } from '..';
import OkList from '../Components/OkList';
import { fetchOneSklad, fetchSklad, removeSkladPosition } from "../http/SkladAPI";
import { fetchTypes } from '../http/typesAPI';
import ShopTab from './Tabs/ShopTab';
import SkladTab from "./Tabs/SkladTab";
import TypesTab from "./Tabs/TypesTab";


const Homepage = observer(() => {
    const { sklad, ogo, shop } = useContext(Context)


    useEffect(() => {
        fetchSklad().then(data => sklad.setSkladItems(data))
        fetchTypes().then(data => ogo.setTypes(data))
    }, []);
    return (
        <Tabs
            defaultActiveKey="sklad"
            transition={true}
            // id="noanim-tab-example"
            className="mb-3 mx-5"
        >

            <Tab eventKey="type" title="Типы" className="mx-5">
                {/* { ogo.types.map(type => <li key={ type.id }>{ type.name }</li>) } */}
                <TypesTab typeItems={ogo.types} />
            </Tab>
            <Tab eventKey="sklad" title="Склад">
                <SkladTab skladItems={sklad.skladItems} />

            </Tab>
            <Tab eventKey="shop" title="Витрина">
                <ShopTab
                    shopItmes={{}}
                />
            </Tab>
        </Tabs>
    );
})

export default Homepage;
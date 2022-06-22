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
import useFetchingCenter, { FetchingCenter } from "../hooks/useFetchingCenter"
import { useStoreRefresh } from "../hooks/useStoreRefresh"
import ShopCard from "../Components/UI/card/ShopCard"



const Shop = () => {

    const [addProdVisible, setAddProdVisible] = useState(false);
    const { ogo, shop, sklad } = useContext(Context)
    const [shopItems, setShopItems] = useState([]);
    const [getShops, isLoad, error] = useStoreRefresh(FetchingCenter.fetchAll, setShopItems)

    useEffect(() => {
        getShops('shop')
        return () => {
            shop.setShopItems(shopItems)
        };
    }, []);

    if (isLoad) return (
        <h1>LOADING.....</h1>
    )

    return (
        <Col md >
            <Row >
                <Button className="my-1"
                    onClick={ () => setAddProdVisible(true) }
                >
                    Start Production Query
                </Button>
                {/* <Col md={ 2 } >
                <TypeBar />

            </Col> */}



                { shopItems.map(s =>
                    <ShopCard shopItem={ s } key={ s.id }></ShopCard>
                ) }





            </Row>
            <ProductionBasket
                show={ addProdVisible }
                onHide={ () => setAddProdVisible(false) }
            />


        </Col>
    )
}

export default Shop
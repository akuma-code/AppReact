import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, FormControl, ListGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Spinner } from "react-bootstrap"
import { Context } from '..'
import useFetchingCenter, { FetchingCenter } from "../hooks/useFetchingCenter"
import { useStoreRefresh } from "../hooks/useStoreRefresh"
import ShopCard from "../Components/UI/card/ShopCard"
import { SRCimg } from '../utils/consts'
import { useTaskForm } from '../hooks/useQueryTask'
import "./pageStyles.scss"

const Shop = () => {

    const [addProdVisible, setAddProdVisible] = useState(false);
    const { ogo, shop, sklad } = useContext(Context)
    const [shopItems, setShopItems] = useState([]);
    const [getShops, isLoad, error] = useStoreRefresh(FetchingCenter.fetchAll, setShopItems)
    const [prodQuery, setProdQuery] = useState([]);
    const [quant, setQuant] = useState([{ value: '', keyID: '' }])
    const [add, rem] = useTaskForm(prodQuery)
    useEffect(() => {
        getShops('shop')
        return () => {
            shop.setShopItems(shopItems)
        };
    }, []);


    if (isLoad) return (
        <h1>LOADING.....</h1>
    )
    const toProd = (shopItem) => {
        setProdQuery([...prodQuery, shopItem])
        add(shopItem, "22-07-03")
    }
    const fromProd = (shopItem) => {
        setProdQuery(prodQuery.filter(p => p.id !== shopItem.id))
        rem(shopItem)
    }
    const changeQuant = (value, keyID) => {
        setQuant(quant.map(pq => pq.id === keyID ? [...pq, value] : pq))
    }

    return (
        <Col md={ 12 } as={ Container }>
            <Row >
                <Button className="my-1 my-btn"
                    onClick={ () => setAddProdVisible(true) }
                >
                    Start Production Query
                </Button>

                { shopItems.map(s =>
                    <ShopCard shopItem={ s } key={ s.id } add={ toProd } rem={ fromProd }></ShopCard>
                ) }
            </Row>
            <Offcanvas show={ addProdVisible }
                onHide={ () => setAddProdVisible(false) }
                placement='bottom'
            >
                <OffcanvasHeader>

                </OffcanvasHeader>
                <OffcanvasBody>
                    <Row>

                        { prodQuery.map((pq, idx) =>
                            <Col key={ idx } sm={ 2 }>

                                <Card className="gap-4 mx-2 " as={ ListGroup.Item } action
                                    bg={ "light" }
                                // onClick={}
                                >
                                    <Card.Text as={ Card.Title } className='d-flex flex-row justify-content-center'>
                                        { pq.title }
                                    </Card.Text>
                                    <Row >
                                        <Col>
                                            <Card.Img
                                                src={ `${SRCimg}${pq.sklad.type?.img || "noimage.jpg"}` }
                                            />
                                        </Col>
                                        <Col>
                                            <Card.Text className='d-flex flex-row justify-content-around'>
                                                <span>Остаток: </span>{ pq.sklad.quant } шт.
                                            </Card.Text>
                                            <FormControl type='number' onChange={ (e) => changeQuant(e.target.value, pq.id) }
                                                value={ pq.quant } />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ) }
                    </Row>
                </OffcanvasBody>
            </Offcanvas>
            {/* <ProductionBasket
                show={ addProdVisible }
                onHide={ () => setAddProdVisible(false) }
            /> */}


        </Col>
    )
}

export default Shop
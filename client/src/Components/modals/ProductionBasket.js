import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import { Form, Modal, Button, Dropdown, div, Container, Row, Col, FormControl } from 'react-bootstrap'
import { Context } from '../..'
import { FetchingCenter } from "../../hooks/useFetchingCenter"
import { startProdQuery } from "../../http/prodQueryAPI"
import { fetchPositions } from "../../http/shopAPI"
import { _makeProductionForm } from "../../utils/formService"


const ProductionBasket = ({ show, onHide }) => {
    const { ogo, sklad, shop } = useContext(Context);
    const [positions, setPositions] = useState([{ title: '', count: '', date: '', number: Date.now() }])
    const [shopItems, setShopItems] = useState([]);
    const [count, setCount] = useState(1);
    const [date, setDate] = useState("2022-07-17"); //! убрать заглушку





    const addPos = () => {
        // setDate("2022-04-17")  //! убрать заглушку
        // setCount(1)  //! убрать заглушку
        setPositions([...positions, { title: '', count: '', date: '', number: Date.now() }])

    }

    const changePos = (key, value, number) => {
        setPositions(positions.map(pos => pos.number === number ? { ...pos, [key]: value } : pos))

    }

    const removePos = (number) => {
        setPositions(positions.filter(pos => pos.number !== number))
    }

    const ADD = () => {
        const result = [];
        positions.forEach(pos => _makeProductionForm(pos, result))

        startProdQuery(result)
    }
    useLayoutEffect(() => {
        setShopItems(shop.shopItems)

    }, [])
    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить в очередь производства
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    { positions && positions.map(pos =>
                        <Row
                            className="mt-1 "
                            md={ 5 }
                            key={ pos.number }
                        >
                            <Col
                                md={ 4 }>
                                <Form.Select
                                    value={ pos.title }
                                    onChange={ (e) => changePos('title', e.target.value, pos.number) }
                                >
                                    <option>Выберите позицию</option>
                                    { shopItems.map(sItem =>
                                        <option key={ sItem.id } value={ sItem.title }>{ sItem.title }</option>) }
                                </Form.Select>
                            </Col>
                            <Col
                                md={ 3 }>
                                <Form.Control
                                    placeholder="количество"
                                    type="number"
                                    value={ pos.count }
                                    onChange={ (e) => changePos('count', e.target.value, pos.number) }
                                />
                            </Col>
                            <Col
                                md={ 3 }>
                                <FormControl
                                    type="date"
                                    placeholder="Дата готовности"
                                    value={ pos.date }
                                    onChange={ (e) => changePos('date', e.target.value, pos.number) }
                                >

                                </FormControl>
                            </Col>
                            <Col md={ 1 }>
                                <Button
                                    // style={{ width: "86px" }}
                                    variant={ 'outline-dark' }
                                    className='btn btn-danger'
                                    onClick={ () => removePos(pos.number) }
                                >
                                    Удалить
                                </Button>
                            </Col>


                        </Row>
                    ) }


                    <Button
                        className="w-100 mt-2 btn-secondary"
                        variant={ 'outline-dark' }
                        onClick={ addPos }
                    >
                        Добавить позицию
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    className='btn btn-success'
                    variant={ 'outline-dark' }
                    onClick={ ADD }
                >Добавить</Button>
                <Button onClick={ onHide }>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductionBasket
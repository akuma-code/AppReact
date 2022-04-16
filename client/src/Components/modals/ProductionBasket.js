import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Button, Dropdown, div, Container, Row, Col, FormControl } from 'react-bootstrap'
import { Context } from '../..'
import { fetchPositions } from "../../http/shopAPI"
import { _makeProductionForm } from "../../utils/formService"

const ProductionBasket = observer(({ show, onHide }) => {
    const { ogo } = useContext(Context);
    const [shopItems, setShopItems] = useState([]);
    const [positions, setPositions] = useState([])
    const [count, setCount] = useState(1);
    const [date, setDate] = useState("");



    useEffect(() => {
        fetchPositions(ogo.sortType.id).then(data => setShopItems(ogo.shop));

    }, [ogo.shop])

    const addPos = () => {
        setDate(new Date(Date.now()))
        setPositions([...positions, { title: '', count: '', date: date, number: Date.now() }])

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
        console.log('result:', result);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить в очередь производства
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    {positions.map(pos =>
                        <Row key={pos.number}
                            className="mt-1"
                            md={12}
                        >
                            <Col
                                md={4}>
                                <Form.Select
                                    value={pos.title}
                                    onChange={(e) => changePos('title', e.target.value, pos.number)}
                                >
                                    <option>Выберите позицию</option>
                                    {shopItems.map(sItem =>
                                        <option key={sItem.id}>{sItem.title}</option>)}
                                </Form.Select>
                            </Col>
                            <Col
                                md={2}>
                                <Form.Control
                                    placeholder="количество"
                                    type="number"
                                    value={pos.count}
                                    onChange={(e) => changePos('count', e.target.value, pos.number)}
                                />
                            </Col>
                            <Col
                                md={3}>
                                <FormControl
                                    type="date"
                                    placeholder="Дата готовности"
                                    value={pos.date}
                                    onChange={(e) => changePos('date', e.target.value, pos.number)}
                                >

                                </FormControl>
                            </Col>
                            <Col md={3}>
                                <Button
                                    variant={'outline-dark'}
                                    className='btn btn-danger'
                                    onClick={() => removePos(pos.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}


                    <Button
                        className="w-100 mt-2 btn-secondary"
                        variant={'outline-dark'}
                        onClick={addPos}
                    >
                        Добавить позицию
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    className='btn btn-success'
                    variant={'outline-dark'}
                    onClick={ADD}
                >Добавить</Button>
                <Button onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default ProductionBasket
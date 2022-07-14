import React, { useContext, useEffect, useState } from 'react';
import { Button, CloseButton, Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { Context } from "..";
import MockCard from '../Components/UI/card/MockCard';
import TypeCard from "../Components/UI/card/TypeCard";
import { FetchingCenter } from "../hooks/useFetchingCenter";
import dayjs from "dayjs"

const getToday = () => {
    const now = dayjs().format('DD MM YYYY')
    console.log(now)
    return now
}
const averageDate = () => {
    const now = dayjs().format('DD MM YYYY')
    const avDate = dayjs().add(8, 'day').format('DD MM YYYY')
    return avDate
}

const ProductionModal = ({ show, onHide }) => {
    const { prod, sklad } = useContext(Context)
    const [sklads, setSklads] = useState([]);
    const [itemsQuery, setItemsQuery] = useState([]);
    const [dateReady, setDateReady] = useState(dayjs().add(8, 'day').format('YYYY MM DD'));


    const select = sitem => {
        setItemsQuery([...itemsQuery, sitem])
        setSklads(sklads.filter(s => s.id != sitem.id))
        prod.addTaskToQuery(sitem, { dateReady })

    }
    const remove = sitem => {
        setSklads([...sklads, sitem])
        setItemsQuery(itemsQuery.filter(iq => iq.id != sitem.id))
        prod.setQuery(prod.query.filter(iq => iq.skladId != sitem.id))
    }
    const changeHandler = sitem => {

        setDateReady(e.target.value)


    }
    const handleSubmit = (e) => {
        e && e.preventDefault()
        prod.submitQuery()
        prod.startProduction().then(prod.setQueryForm([]))
        setItemsQuery([])
        FetchingCenter.fetchAll('sklad').then(data => setSklads(data))
        onHide()
    }
    useEffect(() => {
        FetchingCenter.fetchAll('sklad').then(data => setSklads(data))

        setDateReady(dayjs().add(8, 'day').format('YYYY-MM-DD'))

    }, []);

    useEffect(() => {
        prod.setDate(dateReady)
    }, [itemsQuery, dateReady])
    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
            size='lg'
        >
            <Modal.Body

            >

                <Form onSubmit={ handleSubmit }>
                    <Row md={ 4 }>
                        <FloatingLabel
                            label="Готовность на дату:"
                        >
                            <Form.Control
                                type="date"
                                value={ dateReady }
                                onChange={ (e) => setDateReady(dayjs(e.target.value).format('YYYY-MM-DD')) }
                                required

                            />
                        </FloatingLabel>
                        <Button type='submit' >submit</Button>
                    </Row>
                    <Row
                        md={ 5 }
                        className='bg-secondary my-2'
                    >

                        { itemsQuery.map(iq =>
                            <Form.Group key={ iq.id }
                                className="d-flex flex-row my-2"
                            >

                                <div
                                    className="d-flex flex-column justify-content-between">

                                    <TypeCard
                                        className="w-100"
                                        type={ iq.type }
                                        key={ iq.id }
                                    // style={{ zIndex: 2 }}
                                    />


                                    <Form.Control
                                        type='number'
                                        className='w-100 mt-1'
                                        placeholder='кол-во'
                                        value={ iq.number }
                                        onChange={ (e) => prod.changeNumber(e.target.value, iq.id) }
                                    />
                                    <CloseButton
                                        style={ { zIndex: 1, position: "absolute", alignSelf: "flex-end" } }
                                        className="ml-2 bg-danger"

                                        onClick={ () => remove(iq) }

                                    />
                                </div>
                            </Form.Group>

                        ) }
                    </Row>
                </Form>

                <Col className='d-flex flex-row'>
                    <Row md={ 5 }>

                        { sklads.map(sitem =>
                            <TypeCard
                                type={ sitem.type }
                                key={ sitem.id }
                                onClick={ () => select(sitem) }
                                className="mx-1 my-2"
                                style={ { cursor: "pointer" } }
                            />) }



                    </Row>
                </Col>





            </Modal.Body>

        </Modal>
    );
}

export default ProductionModal;

import React, { useContext, useEffect, useState } from 'react';
import { Button, CloseButton, Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { Context } from "..";
import MockCard from '../Components/UI/card/MockCard';
import TypeCard from "../Components/UI/card/TypeCard";
import { FetchingCenter } from "../hooks/useFetchingCenter";



const ProductionModal = ({ show, onHide }) => {
    const { prod, sklad } = useContext(Context)
    const [sklads, setSklads] = useState([]);
    const [itemsQuery, setItemsQuery] = useState([]);


    const select = sitem => {
        setItemsQuery([...itemsQuery, sitem])
        setSklads(sklads.filter(s => s.id != sitem.id))
    }
    const remove = sitem => {
        setSklads([...sklads, sitem])
        setItemsQuery(itemsQuery.filter(iq => iq.id != sitem.id))
    }

    useEffect(() => {
        FetchingCenter.fetchAll('sklad').then(data => setSklads(data))

    }, []);

    useEffect(() => {

    }, [itemsQuery])
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size='lg'
        >
            <Modal.Body

            >

                <Form >
                    <Row md={2}>
                        <FloatingLabel
                            label="Готовность на дату:"
                        >
                            <Form.Control
                                type="date"
                            />
                        </FloatingLabel>
                        <Button type='submit' >submit</Button>
                    </Row>
                    <Row
                        md={5}
                        className='bg-success'
                    >

                        {itemsQuery.map(iq =>
                            <Form.Group key={iq.id}
                                className="d-flex flex-row"
                            >

                                <div
                                    className="d-flex flex-column justify-content-between pos">

                                    <MockCard
                                        className="w-100"
                                    // style={{ zIndex: 2 }}
                                    />


                                    <Form.Control
                                        type='number'
                                        className='w-100'
                                        placeholder='кол-во'
                                    />
                                    <CloseButton
                                        style={{ zIndex: 1, position: "absolute", alignSelf: "flex-end" }}
                                        className="ml-2 bg-danger float-right"

                                        onClick={() => remove(iq)}

                                    /></div>
                            </Form.Group>

                        )}
                    </Row>
                </Form>

                <Col className='d-flex flex-row'>
                    <Row md={5}>

                        {sklads.map(sitem =>
                            <MockCard
                                type={sitem.type}
                                key={sitem.id}
                                onClick={() => select(sitem)}
                                className="mx-3 my-3"
                            // style={{ height: "150px" }}
                            />)}



                    </Row>
                </Col>





            </Modal.Body>

        </Modal >
    );
}

export default ProductionModal;

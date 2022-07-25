import React, { useContext, useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';
import { Badge, Card, Col, Collapse, Container, Dropdown, Row, Table } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { Context } from '../../..';
import { finishTask } from '../../../http/prodQueryAPI';
import { SRCimg } from '../../../utils/consts';
import ImgOK from '../ImgOK';

const mockClient = {
    client_fio: "Pavel Akuma",
    client_tel: "8-929-599-52-95",
    bpm_id: "813452",
    dogovor: "22/07/21-30П"
}
const EndTask = async (taskId) => await finishTask(taskId)


const QueryCard = ({ typeInf, queryItem }) => {
    const { id, number, dateReady, isReady, sklads: [{ id: skladId, typeId }] } = queryItem
    const { ogo, sklad } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState({ name: "", img: "" });
    // const [skInfo, setSkInfo] = useState([{}]);
    const [itemInfo, setItemInfo] = useState({ qId: "", isReady, typeName: "" });
    const [clientInfo, setClientInfo] = useState([]);


    useLayoutEffect(() => {
        setType(typeInf)
        setItemInfo({ ...itemInfo, qId: id, isReady })
        setClientInfo((Object.entries(mockClient)).map(([key, value]) => ({ key, value })))
        // setSkInfo((sklad.skladItems.filter(s => s.id === skladId)))
    }, [])
    useLayoutEffect(() => {
        // setType(...ogo.types.filter(t => t.id === typeId))
        setItemInfo({ ...itemInfo, qId: id, isReady: isReady, typeName: typeInf?.name })
    }, [isOpen, typeInf]);
    return (
        <Card >
            <Row className='border-bottom d-flex flex-row align-items-center'>
                <Col>{ type?.name || "no" }</Col>
                <Col>Кол-во: { number }</Col>
                <Col>Статус: { isReady ? "DONE!" : "IN PRODUCTION!" }</Col>
                <Col md={ 1 }>
                    <Dropdown>
                        <Badge as={ Dropdown.Toggle }
                            bg="secondary"
                            text="dark"
                            className='w-100'
                        >
                            &#9881;
                        </Badge>
                        <Badge as={ Dropdown.Item }
                            bg="dark"
                            text=""
                            onClick={ () => setIsOpen(!isOpen) }
                        >
                            &#9660;
                        </Badge>
                        <Dropdown.Menu>
                            { !isReady && <Dropdown.Item
                                onClick={ () => EndTask(id) }>
                                Finish Task
                            </Dropdown.Item> }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

            </Row>
            <Row>
                <Collapse in={ isOpen }>
                    <Container className='my-1' fluid>
                        <Row md={ 6 } >

                            <Col
                                md={ 3 }>
                                <Card.Img
                                    src={ `${SRCimg}${type?.img}` }
                                />
                            </Col>
                            <Col className=' d-flex flex-row justify-content-between gap-3'
                                md={ { offset: 0, span: 7 } }


                            >
                                <Card border='0' >
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead className='fw-bold'>
                                                <tr><td colSpan={ 2 }>
                                                    Item Info
                                                </td></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        type:
                                                    </td>
                                                    <td>
                                                        { type?.name }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        numb:
                                                    </td>
                                                    <td>
                                                        { number }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Date Finish:
                                                    </td>
                                                    <td>
                                                        { dateReady }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        query ID:
                                                    </td>
                                                    <td>
                                                        { id }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </Card.Body>
                                </Card >
                                <Card border='0'>
                                    <Card.Body>
                                        <Table striped hover>
                                            <thead className='fw-bold'>
                                                <tr>
                                                    <td colSpan={ 2 }>
                                                        Client Info
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { clientInfo.map(c =>
                                                (<tr key={ Math.random() }>
                                                    <td>{ c.key }</td>
                                                    <td>{ c.value }</td>
                                                </tr>)) }
                                            </tbody>
                                        </Table>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                </Collapse>
            </Row>
        </Card>
    );
}

export default QueryCard;

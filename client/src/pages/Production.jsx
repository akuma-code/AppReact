import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import {
    Button, Card, Col, Collapse, Container,
    FloatingLabel, Form, FormControl, FormGroup, ListGroup, Offcanvas, OverlayTrigger, Row, Table, Tooltip
} from "react-bootstrap";
import { Context } from "..";
import { FetchingCenter } from "../hooks/useFetchingCenter";


const formFields = ['quant', 'dateReady', 'isReady']

const Production = () => {

    const { prod } = useContext(Context);
    const [query, setQuery] = useState([])
    const [sklads, setSklads] = useState([])
    const [showSklads, setShowSklads] = useState(false);
    const [ishover, setIshover] = useState(false);
    const [task, setTask] = useState([]);
    const [showDate, setShowDate] = useState(false);
    const [taskForm, setTaskForm] = useState([{ skladId: '', quant: '', unit: {} }]);
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        FetchingCenter.fetchAll('sklad')
            .then(data => setSklads(data))
        FetchingCenter.fetchAll('prod')
            .then(data => setQuery(data))

    }, [])

    const selectSI = skladItem => {
        // setTask([...task, skladItem])
        setShowDate(true)
        setShowSklads(false)
        setFormList([...formList, { quant: 0, unit: skladItem }])
        setSklads(sklads.filter(s => s.id !== skladItem.id))
    }

    const changeQuant = (key, value, id) => {
        setFormList(formList.map(tf => tf.unit.id === id ? { ...tf, [key]: value } : tf))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }
    const addFormField = (skItem) => {
        setTask([...task, skItem])
    }
    const addTaskFormField = (quant, skItem) => {
        setTaskForm([...taskForm, { quant, skladId: skItem.id, unit: skItem }])
    }

    const handleSubmit = (e) => {
        // e && e.preventDefault()
        console.log(e.target);
    }


    return (
        <Container bg="secondary" fluid>
            <Row>
                <Col>
                    <h1 className="text-center">
                        ProdQuery Form
                    </h1>


                    <Offcanvas show={showSklads} onHide={() => setShowSklads(false)}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>OKNO</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {sklads.map(s =>

                                <Card key={s.id} className="gap-4 my-2 " as={ListGroup.Item} action
                                    bg={"light"}
                                    onClick={() => selectSI(s)}>
                                    <Card.Text as={Card.Title} className='d-flex flex-row justify-content-between'>
                                        <span>Тип:</span> {s.type.name}
                                    </Card.Text>
                                    <Row >
                                        <Col>
                                            <Card.Img
                                                src={`${process.env.REACT_APP_API_URL}/${s.type.img || "noimage.jpg"}`}
                                            />
                                        </Col>
                                        <Col>
                                            <Card.Text className='d-flex flex-row justify-content-around'>
                                                <span>Остаток: </span>{s.quant} шт.
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card>

                            )}
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={4}>
                                <Button variant="success" className="h-100"
                                    onClick={() => setShowSklads(!showSklads)}
                                >Добавить изделие в очередь
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Collapse in={showDate}>
                                    <FloatingLabel
                                        label="Дата готовности">
                                        <FormControl type='date' />
                                    </FloatingLabel>
                                </Collapse>
                            </Col>

                        </Row>
                        <Container>
                            <Row >
                                {formList.map(t => //task Item == { quant: '', skladId: skItem.id, unit: skItem }

                                    <Col md={3} key={t.unit.id}>
                                        <Card.Img variant="top"
                                            // style={ { maxHeight: "10rem" } }
                                            src={`${process.env.REACT_APP_API_URL}/${t.unit?.type?.img || "noimage.jpg"}`} />
                                        <FormGroup md={2} className='mt-2' controlId={`skladItemQuant_${t.skladId}`}>
                                            <FloatingLabel label="Количество" >
                                                <FormControl
                                                    type='number'
                                                    placeholder="Количество"
                                                    className='text-center'

                                                    value={t.quant}
                                                    onChange={e => changeQuant('quant', e.target.value, t.unit.id)}

                                                />
                                            </FloatingLabel>
                                        </FormGroup>
                                    </Col>
                                )}
                            </Row>
                            <Button type="submit">Start</Button>
                        </Container>
                    </Form>
                </Col>
                <Col>
                    <h1 className="text-center">Production Tasks</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task ID</th>
                                <th>Sklad Id</th>
                                <th>Type.img</th>
                                <th>quant</th>
                                <th>DateReady</th>
                                <th>isReady</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container >
    );
}

export default Production;

{/* <img src={`${process.env.REACT_APP_API_URL}/${item.type.img || "noimage.jpg"}`} /> */ }

{/* <div className="mx-2">
            {query && query.map(item =>
                <li key={item.id}>TaskID: {item.id} | SkladID: {item?.sklads.map(s => s.id)} | Quantity: {item.quant} | DateReady: {item.dateReady} | {item.isReady ? "DONE" : "Not Ready!"} | </li>
            )}
        </div> */}
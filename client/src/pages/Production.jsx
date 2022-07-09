import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import {
    Button, Card, Col, Collapse, Container,
    FloatingLabel, Form, FormControl, FormGroup, ListGroup, Offcanvas, Row, Table, Tooltip
} from "react-bootstrap";
import { Context } from "..";
import { FetchingCenter } from "../hooks/useFetchingCenter";
import { useTaskForm } from "../hooks/useQueryTask";
import { clearProdQuery, finishTask, getProdQuery, getProdWorking, startProdQuery } from "../http/prodQueryAPI";
import { SRCimg } from "../utils/consts";



const Production = () => {

    const { prod } = useContext(Context);
    const [queryForm, setQueryForm] = useState([]);
    const [query, setQuery] = useState([])
    const [sklads, setSklads] = useState([])
    const [showSklads, setShowSklads] = useState(false);
    const [task, setTask] = useState([]);
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState("");
    const [formList, setFormList] = useState([]);
    const [working, setWorking] = useState([]);
    const [ADD, REM, START] = useTaskForm(setQueryForm);
    const [taskState, setTaskState] = useState([]);



    useEffect(() => {
        FetchingCenter.fetchAll('sklad')
            .then(data => setSklads(data))
        getProdQuery('nested')
            .then(data => setQuery(data))
        getProdWorking()
            .then(prod => setWorking(prod))
    }, [])
    const selectProd = item => {
        setShowDate(true)
        setShowSklads(false)
        // prod.setTask(item)
        prod.addTaskToQuery(item, date)
        setFormList([...formList, { quant: "", unit: item }])
    }
    const selectSI = skladItem => {
        // setTask([...task, skladItem])
        setShowDate(true)
        setShowSklads(false)
        setTaskState([...taskState, { skladId: skladItem.id, number: '' }])
        setFormList([...formList, { quant: "", unit: skladItem }])
        setSklads(sklads.filter(s => s.id !== skladItem.id))
        ADD(skladItem, date)
        // prod.addTaskToQuery(skladItem, 5, date)
        // setTask(task.map(t => t.skladId === skladItem.id ? { ...t, skladId: skladItem.id } : t))
    }

    const changeValue = (key, value, id) => {
        setFormList(formList.map(fl => fl.unit.id === id ? { ...fl, [key]: value } : fl))
        setTaskState(taskState.map(t => t.id === id ? { ...t, [key]: value } : t))
        prod.setQuery(prod.query.map(task => task.skladId === id ? { ...task, [key]: value } : task))
        prod.changeNumber(value, id)
    }
    const makeForm = ({ skladId, quant, dateReady }) => {
        const form = new FormData();
        form.append('dateReady', dateReady)
        form.append('skladId', skladId)
        form.append('quant', quant)
        form.append('isReady', false)
        return form
    }

    const handleSubmit = (e) => {
        e && e.preventDefault()
        const tasks = task.map(t => makeForm(t))

        tasks.forEach(t => startProdQuery(t))
        setFormList([])
        console.log("USE TASK HOOK", queryForm);
        setTimeout(() => setShowDate(false), 1000)
        // const tq = formList.map(fl => fl.unit)
        // prod.addTaskToQuery(tq)
    }
    useEffect(() => {
        setTask(formList.map(fl => ({ skladId: fl.unit.id, quant: fl.quant, dateReady: date })))

    }, [formList]);
    const reset = () => clearProdQuery()

    const EndTask = async (taskId) => await finishTask(taskId)
    return (
        <Container bg="secondary" fluid>
            <Row>
                <Col>
                    <Container className="my-2 border">
                        <Row >
                            <Col sm={ 7 }>
                                <h2 className="d-block">Запуск в производство</h2>
                            </Col>
                            <Col sm={ 5 }>
                                <Button variant="success" className="h-100 w-100"
                                    onClick={ () => setShowSklads(!showSklads) }>Добавить</Button>
                            </Col>


                        </Row>
                    </Container>


                    <Offcanvas show={ showSklads } onHide={ () => setShowSklads(false) } placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>OKNO</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            { sklads.map(s =>

                                <Card key={ s.id } className="gap-4 my-2 " as={ ListGroup.Item } action
                                    bg={ "light" }
                                    onClick={ () => selectProd(s) }>
                                    <Card.Text as={ Card.Title } className='d-flex flex-row justify-content-between'>
                                        <span>Тип:</span> { s.type.name }
                                    </Card.Text>
                                    <Row >
                                        <Col>
                                            <Card.Img
                                                src={ `${SRCimg}${s.type.img || "noimage.jpg"}` }
                                            />
                                        </Col>
                                        <Col>
                                            <Card.Text className='d-flex flex-row justify-content-around'>
                                                <span>Остаток: </span>{ s.quant } шт.
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card>

                            ) }
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Form onSubmit={ handleSubmit }>
                        <Row>
                            {/* <Col sm={ 4 }>
                                <Button variant="success" className="h-100"
                                    onClick={ () => setShowSklads(!showSklads) }
                                >Добавить изделие в очередь
                                </Button>
                            </Col> */}

                            <Col md={ 4 } >
                                <Collapse in={ showDate } >

                                    <FloatingLabel
                                        className=""
                                        label="Дата готовности">
                                        <FormControl type='date'
                                            value={ date }
                                            onChange={ (e) => setDate(e.target.value) }
                                        />

                                    </FloatingLabel>
                                </Collapse>
                            </Col>
                            <Col>
                                <Collapse in={ showDate }>
                                    <Button type="submit" size="lg" className="h-100" >Запуск!</Button>
                                </Collapse>
                            </Col>
                        </Row>
                        <Container>
                            <Row >
                                { formList.map(t => //task Item == { quant: '', skladId: skItem.id, unit: skItem }

                                    <Col md={ 3 } key={ t.unit.id }>
                                        <Card.Img variant="top"
                                            // style={ { maxHeight: "10rem" } }
                                            src={ `${SRCimg}${t.unit?.type?.img || "noimage.jpg"}` } />
                                        <FormGroup md={ 2 } className='mt-2' controlId={ `skladItemQuant_${t.unit.id}` }>
                                            <FloatingLabel label="Количество" >
                                                <FormControl
                                                    type='number'
                                                    placeholder="Количество"
                                                    className='text-center'

                                                    value={ t.quant }
                                                    onChange={ e => changeValue('quant', e.target.value, t.unit.id) }

                                                />
                                            </FloatingLabel>
                                        </FormGroup>
                                    </Col>
                                ) }

                            </Row>
                        </Container>
                    </Form>
                </Col>
                <Col>
                    <h1 className="text-center">Production Tasks</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Prod ID</th>
                                <th>Sklad Id</th>
                                <th>Type</th>
                                <th>quant</th>
                                <th>DateReady</th>
                                <th>isReady</th>
                                <th>Finish</th>
                            </tr>
                        </thead>
                        <tbody>
                            { working.map((p, idx) =>
                                <tr key={ idx }>
                                    <td>{ idx + 1 }</td>
                                    <td>{ p.id }</td>
                                    <td>{ p?.sklads[0]?.id }</td>
                                    <td>{ p?.sklads[0]?.type.name }</td>
                                    <td>{ p?.quant }</td>
                                    <td>{ p?.dateReady }</td>
                                    <td>{ p?.isReady ? "DONE!" : "Working" }</td>
                                    <td><Button onClick={ () => EndTask(p.id) }>FIN</Button></td>
                                </tr>
                            ) }
                        </tbody>
                    </Table>
                    <Button onClick={ reset }>RESET</Button>
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

//         const onSubmit = ({ values }) => {
//     console.log(values, 'submit');
// }
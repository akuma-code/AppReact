import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, ListGroup, Offcanvas, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { Context } from "..";
import { FetchingCenter } from "../hooks/useFetchingCenter";

const Production = () => {

    const { prod } = useContext(Context);
    const [query, setQuery] = useState([])
    const [sklads, setSklads] = useState([])
    const [showSklads, setShowSklads] = useState(false);
    const [ishover, setIshover] = useState(false);




    const hoverHandler = (e) => {
        setIshover(true)
        console.log(e.target);
        if (!ishover) e.target.classList.add("bg-danger")
        else e.target.classList.remove("bg-danger")

    }
    useEffect(() => {
        FetchingCenter.fetchAll('sklad').then(data => setSklads(data))
        FetchingCenter.fetchAll('prod')
            .then(data => setQuery(data))

    }, [])

    useEffect(() => {


    }, [ishover])




    return (
        <Container bg="secondary" fluid>
            <Row>
                <Col>
                    <h1 className="text-center">
                        ProdQuery Form
                    </h1>

                    <Button variant="success"
                        onClick={() => setShowSklads(!showSklads)}
                    >Add to production task</Button>
                    <Offcanvas show={showSklads} onHide={() => setShowSklads(false)}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>OKNO</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {sklads.map(s =>
                                <Card key={s.id} className="gap-4 my-2 " as={ListGroup.Item} action
                                    // bg={query.includes(s) ? "secondary" : "light"}
                                    // onMouseOver={() => setIshover(true)}
                                    // onMouseLeave={() => setIshover(false)}
                                    bg={ishover ? "secondary" : "light"}
                                    onClick={() => setQuery([...query, s])}>
                                    <Row >
                                        <Col>
                                            <Card.Img
                                                src={`${process.env.REACT_APP_API_URL}/${s.type.img || "noimage.jpg"}`}
                                            />
                                        </Col>
                                        <Col >
                                            <Card.Text className='d-flex flex-row justify-content-around'>
                                                <span>Тип:</span> {s.type.name}
                                            </Card.Text>
                                            <Card.Text className='d-flex flex-row justify-content-around'>
                                                <span>Остаток: </span>{s.quant}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card>)}
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Form>

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
        </Container>
    );
}

export default Production;

{/* <img src={`${process.env.REACT_APP_API_URL}/${item.type.img || "noimage.jpg"}`} /> */ }

{/* <div className="mx-2">
            {query && query.map(item =>
                <li key={item.id}>TaskID: {item.id} | SkladID: {item?.sklads.map(s => s.id)} | Quantity: {item.quant} | DateReady: {item.dateReady} | {item.isReady ? "DONE" : "Not Ready!"} | </li>
            )}
        </div> */}
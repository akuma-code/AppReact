import React, { useState, useLayoutEffect } from 'react'
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap"
import { FetchingCenter } from "../../hooks/useFetchingCenter"


const initialVal = [{ items: [{ name: "OK1" }, { name: "OK2" }], count: "", number: Date.now() }]
const skladInit = () => FetchingCenter.fetchAll('sklad')

const NewOffer = ({ show, onHide }) => {
    const [offItems, setOffItems] = useState([])
    const [skItems, setSkItems] = useState([])

    useLayoutEffect(() => {
        FetchingCenter.fetchAll('sklad')
            .then(data => setSkItems(data))

        // setOffItems([{ items: skItems, count: "", number: Date.now() }])

    }, [])
    useLayoutEffect(() => {
        setOffItems(prev => [...prev, { items: skItems, count: "", number: Date.now() }])

    }, [])

    const addItem = () => setOffItems([...offItems, { count: "", number: Date.now() }])
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submit!")
        onHide()
    }

    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
            size="xl">

            <Modal.Header closeButton>
                <Modal.Title>
                    Создать заявку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={ 8 }>
                        <Form id="new-offer-form"
                            onSubmit={ handleSubmit }>
                            <Form.Group className="d-flex flex-column gap-1">
                                <InputGroup>
                                    <InputGroup.Text >
                                        <span className="material-icons">person</span>
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                        placeholder="ФИО Клиента"
                                        required
                                    />
                                </InputGroup>
                                <Form.Group className="d-flex flex-row gap-1">
                                    <InputGroup>
                                        <InputGroup.Text >
                                            <span className="material-icons">phone</span>
                                        </InputGroup.Text>
                                        <Form.Control type="text"
                                            placeholder="Телефон"
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text >БПМ: </InputGroup.Text>
                                        <Form.Control type="text"
                                            placeholder="номер заявки в БПМ"
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <InputGroup>
                                    <InputGroup.Text >Дата доставки </InputGroup.Text>
                                    <Form.Control type="date"
                                        placeholder="доставка на дату"

                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text >Адрес доставки: </InputGroup.Text>
                                    <Form.Control as={ "textarea" }
                                        rows={ 3 }
                                    />
                                </InputGroup>

                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button
                            variant="outline-dark"
                            className="mb-1 w-100"
                            onClick={ addItem }
                        >
                            Добавить позицию</Button>


                        { offItems.map((item, idx) =>
                            <Form.Group className="d-flex flex-row gap-1 flex-grow-1 my-1"
                                key={ idx }>
                                <Button className="d-flex align-items-center"
                                    variant="danger"
                                    size="sm"
                                ><span className="material-icons">highlight_off</span>
                                </Button>
                                <Form.Select >
                                    { item?.items?.map((i, idx) =>
                                        (<option value={ i.type.name } key={ idx }>{ i.type.name }</option>)) }
                                </Form.Select>
                                <Button className="d-flex align-items-center"><span className="material-icons">add_circle_outline</span></Button>
                                <Form.Control type="text"
                                    style={ { width: "3rem" } }
                                />
                                <Button className="d-flex align-items-center"><span className="material-icons">remove_circle_outline</span></Button>
                            </Form.Group>
                        ) }
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="new-offer-form">Применить</Button>
                <Button type="reset" form="new-offer-form">Очистить</Button>
                <Button onClick={ onHide }>Отмена</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewOffer



{/* <Form.Group className="d-flex flex-row gap-1 flex-grow-1">
<Button className="d-flex align-items-center"
    variant="danger"
    size="sm"
><span className="material-icons">highlight_off</span>
</Button>
<Form.Select >
    <option>OK-1</option>
    <option>OK-2</option>
</Form.Select>
<Button className="d-flex align-items-center"><span className="material-icons">add_circle_outline</span></Button>
<Form.Control type="text"
    style={ { width: "3rem" } }
/>
<Button className="d-flex align-items-center"><span className="material-icons">remove_circle_outline</span></Button>

</Form.Group> */}
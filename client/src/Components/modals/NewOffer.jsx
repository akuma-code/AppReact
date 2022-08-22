import React, { useState, useLayoutEffect } from 'react'
import { Button, ButtonGroup, Col, Form, InputGroup, Modal, Row } from "react-bootstrap"
import { FetchingCenter } from "../../hooks/useFetchingCenter"



const NewOffer = ({ show, onHide, preSelect = [], onConfirm }) => {
    const [offItems, setOffItems] = useState([])
    const [skItems, setSkItems] = useState([])
    const [clientInfo, setClientInfo] = useState({ fio: "", tel: "", bpm: "", destin: "", date: "" })
    const [saved, setSaved] = useState([])
    const fork_data = (data) => {
        setSkItems(data)
        // setOffItems(prevState => prevState.map(item => ({ ...item, items: data })))
    }
    const change = (key, value, number) => setOffItems(prev => prev.map(it => it.number === number ? { ...it, [key]: value } : it))
    const INC = (number) =>
        setOffItems(prev => prev.map(it => it.number === number ? { ...it, count: parseInt(it.count || '0', 10) + 1 } : it))
    const DEC = (number) =>
        setOffItems(prev => prev.map(it => it.number === number ? { ...it, count: parseInt(it.count || '0', 10) - 1 } : it))
    const selectItem = (value, number) =>
        setOffItems(prev => prev.map(it => it.number === number ? { ...it, selected: value } : it))
    const remove = (number) =>
        setOffItems(prev => prev.filter(i => i.number !== number))


    useLayoutEffect(() => {
        if (preSelect) setOffItems(preSelect.map(s => ({ selected: s.type.name || "", number: Date.now() })))
        FetchingCenter.fetchAll('sklad')
            .then(fork_data)
    }, [])


    const addItem = () => setOffItems(prev => [...prev, { count: "", number: Date.now() }])
    const handleSubmit = (e) => {
        e.preventDefault()
        setSaved(prev => [...prev, { client: clientInfo, selectedItems: offItems }])
        onConfirm({ client: clientInfo, selectedItems: offItems })
        setOffItems([])
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
                                        // value={ clientInfo.fio }
                                        onChange={ e => setClientInfo(prev => ({ ...prev, fio: e.target.value })) }
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
                                            // value={ clientInfo.tel }
                                            onChange={ e => setClientInfo(prev => ({ ...prev, tel: e.target.value })) }
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text >БПМ: </InputGroup.Text>
                                        <Form.Control type="text"
                                            placeholder="номер заявки в БПМ"
                                            // value={ clientInfo.bpm }
                                            onChange={ e => setClientInfo(prev => ({ ...prev, bpm: e.target.value })) }
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <InputGroup>
                                    <InputGroup.Text >Дата доставки </InputGroup.Text>
                                    <Form.Control type="date"
                                        placeholder="доставка на дату"
                                        // value={ clientInfo.date }
                                        onChange={ e => setClientInfo(prev => ({ ...prev, date: e.target.value })) }

                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text >Адрес доставки: </InputGroup.Text>
                                    <Form.Control as={ "textarea" }
                                        rows={ 3 }
                                        // value={ clientInfo.destin }
                                        onChange={ e => setClientInfo(prev => ({ ...prev, destin: e.target.value })) }
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
                                    onClick={ () => remove(item.number) }
                                ><span className="material-icons">highlight_off</span>
                                </Button>
                                <Form.Select
                                    value={ item.selected }
                                    onClick={ e => selectItem(e.target.value, item.number) }
                                    onChange={ e => selectItem(e.target.value, item.number) }>
                                    <option disabled>позиция...</option>
                                    { skItems.map(i =>
                                        (<option value={ i.type.name } key={ i.id }>ТИП: { i.type.name }</option>)) }
                                </Form.Select>
                                <Button className="d-flex align-items-center"
                                    onClick={ () => INC(item.number) }
                                ><span className="material-icons">add_circle_outline</span></Button>
                                <Form.Control type="text"
                                    style={ { width: "3rem" } }
                                    value={ item.count }
                                    onChange={ (e) => change('count', e.target.value, item.number) }
                                />
                                <Button className="d-flex align-items-center"
                                    onClick={ () => DEC(item.number) }><span className="material-icons">remove_circle_outline</span></Button>
                            </Form.Group>
                        ) }
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer className="d-flex flex-row justify-content-between gap-1">
                <Button type="reset" form="new-offer-form">Очистить форму</Button>
                <ButtonGroup className='gap-1'>
                    <Button type="submit" form="new-offer-form">Применить</Button>
                    <Button onClick={ onHide }>Отмена</Button>
                </ButtonGroup>
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
import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Button, Dropdown, div, Container, Row, Col, FormControl } from 'react-bootstrap'
import { Context } from '../..'
import { createType, fetchTypes } from "../../http/typesAPI"


const CreateType = observer(({ show, onHide }) => {
    const { ogo } = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => ogo.setTypes(data))
    }, [])
    const [currentType, setCurrentType] = useState("");
    const [info, setInfo] = useState([]);
    const [price, setPrice] = useState('')
    const [file, setFile] = useState('')


    const addInfo = () => {
        setInfo([...info, { title: '', desc: '', number: Date.now() }])
        console.log(info)
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const addOkType = () => {
        const formData = new FormData()
        formData.append('type', currentType)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('typeId', ogo.selectedType.id)
        formData.append('info', JSON.stringify(info))

        createType(formData).then(data => onHide())
    }

    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый тип окна
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container className='d-flex w-100 justify-content-between'>
                        <Dropdown >
                            <Dropdown.Toggle className='mt-2 mx-1'>Выбрать тип</Dropdown.Toggle>
                            <Dropdown.Menu>
                                { ogo.types.map(item =>
                                    <Dropdown.Item
                                        key={ item.id }
                                        onClick={ () => setCurrentType(item.type) }
                                    >
                                        { item.type }
                                    </Dropdown.Item>
                                ) }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            className='mt-2 '
                            placeholder="название типа"
                            value={ currentType }
                            onChange={ (e) => setCurrentType(e.target.value) }
                        />
                    </Container>
                    <Form.Control
                        className='mt-2 '
                        placeholder="цена"
                        value={ price }
                        onChange={ (e) => setPrice(e.target.value) }
                    />
                    <Form.Control
                        className='mt-2 custom-file-input'
                        placeholder="изображение"
                        type='file'

                        onChange={ (e) => selectFile(e) }
                    />
                    { info.map(i =>
                        <Row className='mt-2'
                            key={ i.number }>
                            <Col md={ 4 }>
                                <Form.Control
                                    placeholder='название'
                                    value={ i.title }
                                    onChange={ (e) => changeInfo('title', e.target.value, i.number) }
                                />
                            </Col>
                            <Col md={ 4 }>
                                <Form.Control
                                    placeholder='описание'
                                    value={ i.desc }
                                    onChange={ (e) => changeInfo('desc', e.target.value, i.number) }
                                />
                            </Col>
                            <Col md={ 4 }>
                                <Button
                                    variant={ 'outline-dark' }
                                    className='btn btn-danger'
                                    onClick={ () => removeInfo(i.number) }
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ) }
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    variant={ 'outline-dark' }
                    onClick={ addInfo }
                >
                    Добавить инфо
                </Button>
                <Button
                    className='btn btn-success'
                    variant={ 'outline-dark' }
                    onClick={ addOkType }
                >Добавить</Button>
                <Button onClick={ onHide }>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateType
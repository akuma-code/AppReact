import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Button, Dropdown, div, Container, Row, Col, FormControl } from 'react-bootstrap'
import { Context } from '../..'
import { createType, fetchTypes } from "../../http/typesAPI"


const CreateType = observer(({ show, onHide }) => {
    const { ogo } = useContext(Context)

    const [typeName, setTypeName] = useState("");
    const [info, setInfo] = useState([]);
    const [file, setFile] = useState('')

    useEffect(() => {
        fetchTypes().then(data => ogo.setTypes(data))
    }, [])


    const addInfo = () => {
        setInfo([...info, { desc: '', number: Date.now() }])
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
        const form = new FormData();
        form.append('name', typeName.toUpperCase())
        form.append('img', file)
        form.append('info', JSON.stringify(info))

        createType(form).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый тип окна
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='mt-2 '
                        placeholder="название типа"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                        autoComplete={"on"}
                    />

                    <Form.Control
                        className='mt-2 custom-file-input'
                        placeholder="изображение"
                        type='file'
                        onChange={(e) => selectFile(e)}
                    />


                    {info.map(i =>
                        <Row className='mt-2'
                            key={i.number}>

                            <Col md={9}>
                                <Form.Control
                                    placeholder='описание'
                                    value={i.desc}
                                    onChange={(e) => changeInfo('desc', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    variant={'outline-dark'}
                                    className='btn btn-danger'
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                    <Button
                        className="w-100 mt-2 btn-secondary"
                        variant={'outline-dark'}
                        onClick={addInfo}
                    >
                        Добавить инфо
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    className='btn btn-success'
                    variant={'outline-dark'}
                    onClick={addOkType}
                >Добавить</Button>
                <Button onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateType
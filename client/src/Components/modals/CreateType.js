import React, { useContext, useState } from 'react'
import { Form, Modal, Button, Dropdown, div, Container, Row, Col, FormControl } from 'react-bootstrap'
import { Context } from '../..'


const CreateType = ({ show, onHide }) => {
    const { ogo } = useContext(Context)
    const [currentType, setCurrentType] = useState("");
    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo([...info, { title: '', desc: '', number: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
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
                    <Container className='d-flex w-100 justify-content-between'>
                        <Dropdown >
                            <Dropdown.Toggle className='mt-2 mx-1'>Выбрать тип</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {ogo.types.map(item =>
                                    <Dropdown.Item key={item.id}
                                        onClick={() => setCurrentType(item.type)}
                                    >
                                        {item.type}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            className='mt-2 '
                            placeholder="название типа"
                            value={currentType}
                            onChange={(e) => setCurrentType(e.target.value)}
                        />
                    </Container>
                    <Form.Control
                        className='mt-2 '
                        placeholder="цена"
                    />
                    <Form.Control
                        className='mt-2 custom-file-input'
                        placeholder="изображение"
                        type='file'
                    />
                    {info.map(i =>
                        <Row className='mt-2'
                            key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    placeholder='название'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder='описание'
                                />
                            </Col>
                            <Col md={4}>
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
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    variant={'outline-dark'}
                    onClick={addInfo}
                >
                    Добавить инфо
                </Button>


                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateType
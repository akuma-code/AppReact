import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import { createPosition } from "../../http/shopAPI";
import { fetchTypes, fetchOneType } from "../../http/typesAPI";
import { Context } from '../../index'

const CreateShopPosition = observer(({ show, onHide }) => {
    const { ogo } = useContext(Context)
    const [typeId, setTypeId] = useState("")
    const [price, setPrice] = useState("")
    const [posName, setPosName] = useState("");

    useEffect(() => {
        fetchTypes().then(data => {
            ogo.setTypes(data)
        })
    }, [])

    useEffect(() => {
        fetchOneType(typeId).then(oktype => {
            ogo.setSelectedType(oktype)
            setTypeId(oktype.id)
            setPosName(ogo.selectedType.name)
        })
    }, [typeId])

    const click = (type) => {
        ogo.setSelectedType(type)
        setTypeId(type.id)
        setPosName(type.name)
    }
    const addNewPos = () => {
        const form = new FormData();
        form.append('typeId', typeId)
        form.append('price', price)
        form.append('title', posName)
        createPosition(form).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новое окно
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* <Form.Select
                        className='mt-2 '
                        placeholder="название типа"
                        value={typeId }
                        onChange={(e) => setTypeId(e.target.value)}
                    >
                        <option>Выберите тип окна</option>
                        {ogo.types && ogo.types.map((type, ind) =>
                            <option key={ind} value={type.id}
                                onClick={() => ogo.setSelectedType(type)}
                            >{type.name}</option>)}
                    </Form.Select> */}
                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={ogo.selectedType.name}
                            value={ogo.selectedType.name}
                            id="input-group-dropdown-1"
                        >{ogo.types && ogo.types.map(type =>
                            <Dropdown.Item key={type.id}
                                onClick={() => click(type)}
                            >{type.name}
                            </Dropdown.Item>
                        )}
                        </DropdownButton>
                        <FormControl placeholder="название окна"
                            value={posName}
                            onChange={(e) => setPosName(e.target.value)} />
                    </InputGroup>
                    <Form.Control
                        className='mt-2 '
                        placeholder="цена"
                        value={price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    className='btn btn-success'
                    variant={'outline-dark'}
                    onClick={addNewPos}
                >Добавить</Button>
                <Button onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateShopPosition;

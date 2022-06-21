import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useConsole } from "../../hooks/useConsole";

import { addToShop, createSkladPosition, fetchSklad, updateSkladItem } from "../../http/SkladAPI";
import { fetchTypes } from "../../http/typesAPI";
import { Context } from '../../index'

const EditSkladPosition = observer(({ show, onHide, skladItem }) => {
    const { ogo, sklad } = useContext(Context)
    const [typeId, setTypeId] = useState("")
    const [quant, setQuant] = useState("")
    const [typeName, setTypeName] = useState("");
    const [skladId, setSkladId] = useState("");
    const [types, setTypes] = useState([]);


    useEffect(() => {
        fetchTypes().then(data => setTypes(data))

        setQuant(skladItem.quant)
    }, [])

    useEffect(() => {
        sklad.selectedItem.type && setTypeName(skladItem.type.name)

    }, [sklad.selectedItem.type]);

    const clickType = (type) => {

        ogo.setSelectedType(type)
        setTypeName(type.name)
        setTypeId(type.id)
    }
    const updatePos = () => {
        const form = new FormData();
        form.append('quant', quant || skladItem.quant)
        form.append('typeId', typeId || skladItem.typeId)
        form.append('id', skladItem.id)
        updateSkladItem(form).then(data => {
            onHide()
            useConsole(data)
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать окно, (ID склада: {skladItem.id})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={typeName ? typeName : "изменить тип окна"}
                            value={typeId}
                            id="input-group-dropdown-1"
                        >
                            {types.map((type, idx) =>
                                <Dropdown.Item key={idx}
                                    onClick={() => clickType(type)}
                                >{type.name}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>

                    </InputGroup>
                    <Form.Control
                        className='mt-2 '
                        placeholder="Количество"
                        value={quant || sklad.selectedItem.quant}
                        type="number"
                        onChange={(e) => setQuant(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    className='btn btn-success'
                    variant={'outline-dark'}
                    onClick={updatePos}
                >Обновить позицию</Button>
                {/* <Button
                    className='btn btn-success'
                    variant={'outline-dark'}
                    onClick={() => { }}
                >добавить на витрину</Button> */}
                <Button onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default EditSkladPosition;

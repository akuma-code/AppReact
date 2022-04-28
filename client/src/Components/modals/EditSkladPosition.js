import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useConsole } from "../../hooks/useConsole";

import { createSkladPosition, fetchSklad, updateSkladItem } from "../../http/SkladAPI";
import { fetchTypes } from "../../http/typesAPI";
import { Context } from '../../index'

const EditSkladPosition = observer(({ show, onHide }) => {
    const { ogo, sklad } = useContext(Context)
    const [typeId, setTypeId] = useState("")
    const [quant, setQuant] = useState("")
    const [typeName, setTypeName] = useState("");
    const [skladId, setSkladId] = useState("");
    const [types, setTypes] = useState([]);


    useEffect(() => {
        fetchTypes().then(data => setTypes(data))

        // setQuant(sklad.selectedItem.quant)
    }, [])

    useEffect(() => {
        sklad.selectedItem.type && setTypeName(sklad.selectedItem.type.name)

    }, [sklad.selectedItem.id]);

    const clickType = (type) => {

        ogo.setSelectedType(type)
        setTypeName(type.name)
        setTypeId(type.id)
    }
    const updatePos = () => {
        const form = new FormData();
        form.append('quant', quant || sklad.selectedItem.quant)
        form.append('typeId', typeId || sklad.selectedItem.typeId)
        form.append('id', sklad.selectedItem.id)
        updateSkladItem(form).then(data => {
            onHide()
            useConsole(data)
        })
    }

    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать окно, (ID склада: { sklad.selectedItem.id })
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={ typeName ? typeName : "изменить тип окна" }
                            value={ typeId }
                            id="input-group-dropdown-1"
                        >{ types.map((type, idx) =>
                            <DropdownItem key={ idx }
                                onClick={ () => clickType(type) }
                            >{ type.name }
                            </DropdownItem>
                        ) }
                        </DropdownButton>

                    </InputGroup>
                    <Form.Control
                        className='mt-2 '
                        placeholder="Количество"
                        value={ quant || sklad.selectedItem.quant }
                        type="number"
                        onChange={ (e) => setQuant(e.target.value) }
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    className='btn btn-success'
                    variant={ 'outline-dark' }
                    onClick={ updatePos }
                >Обновить позицию</Button>
                <Button onClick={ onHide }>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default EditSkladPosition;

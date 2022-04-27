import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";

import { createSkladPosition, fetchSklad } from "../../http/SkladAPI";
import { fetchTypes } from "../../http/typesAPI";
import { Context } from '../../index'

const CreateSkladPosition = observer(({ show, onHide }) => {
    const { ogo } = useContext(Context)
    const { sklad } = useContext(Context)
    const [typeId, setTypeId] = useState("")
    const [quant, setQuant] = useState(0)
    const [typeName, setTypeName] = useState("");
    const [skladId, setSkladId] = useState("");
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => {
            setTypes(data)
        })
    }, [])

    // useEffect(() => {
    //     fetchOneType(typeId).then(oktype => {
    //         // ogo.setSelectedType(oktype)
    //         // setTypeId(oktype.id)
    //         // setPosName(ogo.selectedType.name)
    //     })
    // }, [typeId])

    const clickType = (type) => {

        ogo.setSelectedType(type)
        setTypeName(type.name)
        setTypeId(type.id)
    }
    const addNewPos = () => {
        const form = new FormData();

        // form.append('skladId', skladId)
        // form.append('typeId', typeId)
        form.append('quant', quant)
        form.append('typeId', typeId)
        createSkladPosition(form).then(data => onHide()).finally(fetchSklad().then(data => sklad.setSkladItems(data)))
    }

    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать окно
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={ typeName ? typeName : "укажите тип" }
                            value={ typeName }
                            id="input-group-dropdown-1"
                        >{ types.map((type, idx) =>
                            <Dropdown.Item key={ idx }
                                onClick={ () => clickType(type) }
                            >{ type.name }
                            </Dropdown.Item>
                        ) }
                        </DropdownButton>
                        {/* <FormControl placeholder="название окна"
                            value={typeName}
                            onChange={(e) => setTypeName(e.target.value)} /> */}
                    </InputGroup>
                    <Form.Control
                        className='mt-2 '
                        placeholder="цена"
                        value={ quant }
                        type="number"
                        onChange={ (e) => setQuant(e.target.value) }
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button
                    className='btn btn-success'
                    variant={ 'outline-dark' }
                    onClick={ addNewPos }
                >Добавить</Button>
                <Button onClick={ onHide }>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateSkladPosition;

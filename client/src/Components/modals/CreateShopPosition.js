import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { createPosition } from "../../http/shopAPI";
import { fetchTypes, fetchOneType } from "../../http/typesAPI";
import { Context } from '../../index'

const CreateShopPosition = observer(({ show, onHide }) => {
    const { ogo } = useContext(Context)
    const [typeId, setTypeId] = useState("")
    const [typeName, setTypeName] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        fetchTypes().then(data => {
            ogo.setTypes(data)
        })
    }, [])

    useEffect(() => {
        fetchOneType(typeId).then(oktype => {
            ogo.setSelectedType(oktype)
            setTypeName(oktype.name)
        })
    }, [typeId])


    const addNewPos = () => {
        const form = new FormData();
        form.append('typeId', typeId)
        form.append('price', Number(price))
        form.append('title', typeName)
        createPosition(form).then(data => onHide())
    }

    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новое окно
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select
                        className='mt-2 '
                        placeholder="название типа"
                        value={ typeId }
                        onChange={ (e) => setTypeId(e.target.value) }
                    >
                        { ogo.types.map((type, ind) =>
                            <option key={ ind } value={ type.id }>{ type.name }</option>) }
                    </Form.Select>
                    <Form.Control
                        className='mt-2 '
                        placeholder="цена"
                        value={ price }
                        onChange={ (e) => setPrice(e.target.value) }
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

export default CreateShopPosition;

import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import { fetchSklad } from "../../http/prodQueryAPI";
import { createPosition } from "../../http/shopAPI";
import { fetchTypes, fetchOneType } from "../../http/typesAPI";
import { Context } from '../../index'

const CreateShopItem = observer(({ show, onHide }) => {
    const { ogo } = useContext(Context)
    const { sklad } = useContext(Context)
    const [typeId, setTypeId] = useState("")
    const [price, setPrice] = useState("")
    const [posName, setPosName] = useState("");
    const [shopName, setShopName] = useState("");
    const [skladId, setSkladId] = useState("");
    const [skladItems, setSkladItems] = useState([]);


    useEffect(() => {
        fetchSklad().then(data =>
            setSkladItems(data)
        )

    }, [])

    useEffect(() => {
        fetchSklad().then(data =>
            setSkladItems(data))
    }, [sklad.skladItems])

    const click = (item) => {
        console.log(item);
        // sklad.setSelectedItem(item)

        setPosName(item.type.name)
        item.shop && setShopName(item.shop.title)
        setSkladId(item.id)
    }
    const addNewPos = () => {
        const form = new FormData();

        form.append('skladId', skladId)
        form.append('typeId', typeId)
        form.append('price', price)
        form.append('title', shopName)
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
                    Добавить позицию на витрину
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={posName ? posName : "укажите позицию"}
                            value={posName}
                            id="input-group-dropdown-1"
                        >
                            {skladItems.map((item, idx) =>
                                <Dropdown.Item key={idx}
                                    onClick={() => click(item)}
                                >
                                    {item.type?.name}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                        <FormControl placeholder="название окна"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)} />
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

export default CreateShopItem;

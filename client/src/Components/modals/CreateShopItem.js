import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import { FetchingCenter } from "../../hooks/useFetchingCenter";
import { useStoreRefresh } from "../../hooks/useStoreRefresh";
import { fetchSklad } from "../../http/SkladAPI";
import { createPosition, removeShopPosition } from "../../http/shopAPI";
import { fetchTypes, fetchOneType } from "../../http/typesAPI";
import { Context } from '../../index'
import TypeCard from "../UI/card/TypeCard";

/**
 * item={
 * id, quant, typeId, 
 * type:
 *   {
 *   name,
 *   img,
 *   info[]
 *   },
 * shop:{
 *  title,
 *  price}
 *   },
 * prod:[]
 */

const CreateShopItem = observer(({ show, onHide, item }) => {
    const { ogo, shop } = useContext(Context)
    const { sklad } = useContext(Context)
    const [typeId, setTypeId] = useState("")
    const [price, setPrice] = useState("")
    const [posName, setPosName] = useState("");
    const [shopName, setShopName] = useState("");
    const [skladId, setSkladId] = useState("");
    const [skladItems, setSkladItems] = useState([]);
    const [updateShop, isLoad, error] = useStoreRefresh(FetchingCenter.fetchAll, shop.setShopItems)

    useEffect(() => {
        setSkladId(item.id)
        setTypeId(item.typeId)
    }, [])

    // useEffect(() => {
    //     fetchSklad().then(data =>
    //         setSkladItems(data))
    // }, [sklad.skladItems])

    const click = (item) => {
        console.log(item);
        // sklad.setSelectedItem(item)

        setPosName(item.type.name)
        item.shop && setShopName(item.shop.title)
        setSkladId(item.id)
        setTypeId(item.typeId)
    }
    const addNewPos = () => {
        const form = new FormData();

        form.append('skladId', skladId)
        form.append('typeId', typeId)
        form.append('price', price)
        form.append('title', shopName)
        createPosition(form).then(data => onHide()).finally(() => updateShop('shop'))
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
            <Modal.Body className="d-flex justify-content-around gap-2">
                <TypeCard type={item.type} ></TypeCard>
                <Form>
                    <InputGroup className="w-100">
                        <Form.Label className="text-center fw-bold">

                            <FormControl
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="mb-2 w-100"
                            />
                            <Form.Text>Название позиции</Form.Text>
                        </Form.Label>
                        <Form.Label className="text-center fw-bold">

                            <Form.Control
                                className='my-2 w-100'

                                value={price}
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Form.Text>
                                Цена, руб
                            </Form.Text>
                        </Form.Label>
                    </InputGroup>
                    <Button

                        className='w-100 mt-4'
                        variant={'outline-dark'}
                        onClick={addNewPos}
                    >Добавить
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>

                <Button onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateShopItem;


{/**  <DropdownButton
                            variant="outline-secondary"
                            title={posName ? posName : "укажите позицию"}
                            value={posName}
                            id="input-group-dropdown-1"
                        ></DropdownButton>
                         skladItems.map((item, idx) =>
                                <Dropdown.Item key={idx}
                                    onClick={() => click(item)}
                                >
                                    {item.type?.name}
                                </Dropdown.Item>
                            )*/}
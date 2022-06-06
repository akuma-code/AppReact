import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Col } from "react-bootstrap";
import { Context } from "../..";
import { fetchPositions } from "../../http/shopAPI";
import { fetchSklad } from "../../http/SkladAPI";

const CtrlBtns_Sklad = observer(({ handlers }) => {
    const { sklad, shop } = useContext(Context)
    const { onHide, getAll, getOne, clearAll, createShop, deleteItem, activeItem } = handlers
    const [isDisabled, setIsDisabled] = useState(false);
    const [skItem, setSkItem] = useState({})

    const updatePOS = () => {
        fetchSklad().then(data => sklad.setSkladItems(data))
        fetchPositions().then(data => shop.setShopItems(data))
    }
    useEffect(() => {
        setSkItem(activeItem)
        activeItem.id ? setIsDisabled(false) : setIsDisabled(true)
        return () => updatePOS()

    }, [activeItem]);


    return (
        <Col md={true} bg='dark'>
            <ButtonGroup vertical
                className="w-100 mb-1">
                <Button variant="success" onClick={onHide}>Добавить окно</Button>
                <Button variant="warning" onClick={() => createShop(sklad.selectedItem.id)} >{sklad.selectedItem.id ? `Выставить на витрину(${activeItem.id})` : "Выставить на витрину"}</Button>
                <Button onClick={() => updatePOS()}>Обновить список</Button>

            </ButtonGroup>

            <ButtonGroup vertical
                className="w-100 my-1 mt-2">
                <Button variant="outline-danger" onClick={() => deleteItem(skItem.id)} disabled={isDisabled}>Удалить выбранный</Button>

            </ButtonGroup>
            <ButtonGroup vertical
                className="w-100 my-1">
                <Button onClick={() => getOne(skItem.id)} disabled={isDisabled}
                    variant={isDisabled ? "primary" : "danger"}
                >ИНФО</Button>
            </ButtonGroup>
            <ButtonGroup
                size="lg"
                vertical
                className="mt-5">
                <Button variant="danger" onClick={() => clearAll()}>Очистить склад</Button>
            </ButtonGroup>
        </Col>
    );
})

export default CtrlBtns_Sklad;

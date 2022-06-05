import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Col } from "react-bootstrap";
import { Context } from "../..";


const CtrlBtns_Sklad = observer(({ handlers }) => {
    const { sklad } = useContext(Context)
    const { onHide, getAll, getOne, clearAll, activeItem } = handlers
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        sklad.selectedItem.id ? setIsDisabled(false) : setIsDisabled(true)

    }, [activeItem.id]);


    return (
        <Col md={true} bg='dark'>
            <ButtonGroup vertical
                className="w-100 mb-1">
                <Button variant="success" onClick={onHide}>Добавить окно</Button>
                <Button onClick={() => getAll()}>Обновить список</Button>

            </ButtonGroup>

            <ButtonGroup vertical
                className="w-100 my-1">
                <Button variant="outline-warning" disabled={isDisabled}>{activeItem.shopId ? activeItem.shopId : "Выставить на витрину"}</Button>
                <Button variant="outline-danger" onClick={() => clearAll(activeItem.id)} disabled={isDisabled}>Удалить выбранный</Button>
                <Button variant="outline-danger" onClick={() => clearAll()}>Удалить ВСЕ!</Button>
            </ButtonGroup>
            <ButtonGroup vertical
                className="w-100 my-1">
                <Button onClick={() => getOne(activeItem.id)} disabled={isDisabled}
                    variant={isDisabled ? "primary" : "danger"}
                >ИНФО</Button>
            </ButtonGroup>
        </Col>
    );
})

export default CtrlBtns_Sklad;

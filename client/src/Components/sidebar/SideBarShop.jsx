import React from 'react';
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { clearShop } from "../../http/shopAPI";

const SideBarShop = () => {

    const isConfirmed = (text) => confirm(text)
    const clearAll = () => isConfirmed("Убрать все с витрины") ? clearShop() : null


    return (
        <Row>
            <ButtonGroup vertical
                className="w-100 mb-1">
                <Button >Обновить список</Button>
            </ButtonGroup>

            <ButtonGroup vertical
                className="w-100 my-1 mt-2">
                <Button variant={ "danger" }
                >Удалить выбранный
                </Button>

            </ButtonGroup>
            <ButtonGroup vertical
                className="w-100 my-1">
                <Button
                >ИНФО
                </Button>
            </ButtonGroup>
            <ButtonGroup
                size="lg"
                vertical
                className="mt-5">
                <Button variant="danger"
                    onClick={ clearAll }
                >Очистить витрину</Button>
            </ButtonGroup>
        </Row>
    );
}

export default SideBarShop;

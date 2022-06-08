import React from 'react';
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

const SideBarShop = () => {
    return (
        <Row>
            <ButtonGroup vertical
                className="w-100 mb-1">
                <Button variant="success" >Добавить окно</Button>
                <Button variant="warning" > Выставить на витрину </Button>
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
                <Button variant="danger" >Очистить склад</Button>
            </ButtonGroup>
        </Row>
    );
}

export default SideBarShop;

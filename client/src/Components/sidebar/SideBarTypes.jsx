import React from 'react';
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

const SideBarTypes = () => {
    return (
        <Row>
            <ButtonGroup vertical
                className="w-100 mb-1">
                <Button variant="success" >Добавить новый тип</Button>
                <Button variant="warning" > Редактировать выбранный </Button>
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
                <Button variant="danger" >Удалить все!</Button>
            </ButtonGroup>
        </Row>
    );
}

export default SideBarTypes;

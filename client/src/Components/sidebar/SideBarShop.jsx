import React from 'react';
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { FetchingCenter } from "../../hooks/useFetchingCenter";
import { useStoreRefresh } from "../../hooks/useStoreRefresh";
import { clearShop } from "../../http/shopAPI";

const SideBarShop = ({ getShops }) => {

    const isConfirmed = (text) => confirm(text)
    const clearAll = () => isConfirmed("Убрать все с витрины") ? clearShop() : null

    return (
        <Row>
            <ButtonGroup vertical
                className="w-100 mb-1">
                <Button onClick={ () => getShops('shop') }
                >Обновить список</Button>
            </ButtonGroup>

            {/*<ButtonGroup vertical
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
            </ButtonGroup> */}
            <ButtonGroup
                size="lg"
                vertical
                className="mt-2">
                <Button variant="danger"
                    onClick={ clearAll }
                >Очистить витрину</Button>
            </ButtonGroup>
        </Row>
    );
}

export default SideBarShop;

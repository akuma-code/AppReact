import React from 'react';
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { OKNO_ROUTE } from "../../../utils/consts";

const ShopItem = ({ shopItem }) => {
    const history = useHistory()
    const { id, title, price, type } = shopItem;




    return (
        <Card style={ { width: '12rem' } } className="mt-2 mx-1">
            <Card.Body>
                <Card.Title>{ title }</Card.Title>
                <Card.Img
                    variant="top"
                    src={ type && `${process.env.REACT_APP_API_URL}/${type.img}` }
                    alt="No Image"

                />
                <Card.Text className="text-center">
                    Цена: { price } руб.
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between"
            >
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={ () => history.push(OKNO_ROUTE + '/' + id) }
                >
                    Открыть
                </Button>
                <Button variant="danger"
                    size="sm"
                >
                    Удалить</Button>
            </Card.Footer>
        </Card>
    );
}

export default ShopItem;

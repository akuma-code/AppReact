import React from 'react';
import { observer } from "mobx-react-lite";
import { Button, Card } from "react-bootstrap";
import { useConsole } from "../../../hooks/useConsole";

const ShopCard = observer(({ shopItem }) => {
    const { id, price, title, skladId } = shopItem;



    return (
        <Card style={{ width: '13rem' }} className="mt-2 mx-1">
            <Card.Body
                className='d-flex flex-column justify-content-between'
            >
                <Card.Title as="h5"
                    style={{ fontSize: 19 }}
                > {title}
                    <hr />
                </Card.Title>
                <p className='d-flex flex-column'
                    style={{ fontSize: 16 }}>
                    <span>Price: {price} руб.</span>
                    <span>Id: {id}</span>
                    <span>SkladId:{skladId}</span>
                </p>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between"
            >

            </Card.Footer>
        </Card>
    );
})

export default ShopCard;
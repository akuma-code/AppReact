import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { removeShopPosition } from '../../../http/shopAPI';
import { OKNO_ROUTE } from "../../../utils/consts";

const ShopItem = ({ shopItem }) => {
    const history = useHistory()
    const { id, title, price, type } = shopItem;




    return (
        <Card style={{ width: '13rem' }} className="mt-2 mx-1">
            <Card.Body
                className='d-flex flex-column justify-content-between'
            >
                <Card.Title as={"h4"}>{title}</Card.Title>
                <Card.Img
                    variant="top"
                    src={type && `${process.env.REACT_APP_API_URL}/${type.img}`}
                    alt="No Image"

                />
                <Card.Text className="text-center">
                    <ListGroup>
                        <ListGroupItem className='bg-warning font-weight-bold'>
                            Цена: {price} руб.
                        </ListGroupItem>
                        {type.info && type.info.map((i, idx) =>
                            <ListGroupItem key={idx}
                                style={{
                                    backgroundColor: (idx % 2 === 0) ? "lightgray" : "darkgray",
                                    fontSize: 13
                                }}
                            >
                                {i.title}  :  {i.desc}
                            </ListGroupItem>)}

                    </ListGroup>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between"
            >
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => history.push(OKNO_ROUTE + '/' + id)}
                >
                    Открыть
                </Button>
                <Button variant="danger"
                    size="sm"
                    onClick={() => removeShopPosition(id)}
                >
                    Удалить</Button>
            </Card.Footer>
        </Card>
    );
}

export default ShopItem;

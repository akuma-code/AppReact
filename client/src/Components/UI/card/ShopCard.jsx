import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Badge, Button, ButtonGroup, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useConsole } from "../../../hooks/useConsole";
import { Context } from '../../..';
import { SRCimg } from '../../../utils/consts';









const ShopCard = ({ shopItem, ...props }) => {
    const [checked, setChecked] = useState(false);
    const { sklad: { type, quant, id: skladId }, price, title } = shopItem;
    const { prod } = useContext(Context)


    const addToProd = () => {

        setChecked(!checked)
    }
    useEffect(() => {
        checked ? props?.add(shopItem) : props?.rem(shopItem)
        return () => {
            console.log("ADDED: ", shopItem);
        };
    }, [checked]);
    return (
        <Card className="mt-2 mx-1"
            // style={ { width: '45vh' } }
            style={{ border: checked ? "3px solid green" : "", width: '25vw' }}
        >

            <Card.Header className="d-flex justify-content-between"
            >
                <Card.Text as="h4">{title || type?.name}</Card.Text>
                <Card.Text as="h4"> {price} руб.</Card.Text>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>

                        <Card.Img
                            src={`${SRCimg}${type?.img || "noimage.jpg"}`} />
                    </Col>
                    <Col>
                        <ListGroup numbered>

                            {type?.info.map(i =>
                                <ListGroupItem
                                    as={"li"}
                                    className="mb-1"
                                    action
                                    variant="secondary"
                                    key={i.id}
                                >
                                    {i.desc}
                                </ListGroupItem>
                            )
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Body>

            <Card.Footer as={"h5"}
                className="d-flex justify-content-around "
            >
                <ButtonGroup>
                    <Button
                        variant='outline-success' onClick={() => addToProd(shopItem)}
                    >
                        {checked ? "ADDED!" : "Add to query"}
                    </Button>
                    <Button variant='outline-dark' >BTN2</Button>
                </ButtonGroup>
                <ListGroupItem className='bg-secondary d-flex flex-row justify-content-between' >
                    <span>НА СКЛАДЕ</span>
                    <Badge
                        bg={quant <= 2 ? "warning" : "light"}
                        text="dark"
                        className="mx-2"

                    >
                        {quant} шт.
                    </Badge>
                </ListGroupItem>
            </Card.Footer>
        </Card>
    );
}

export default ShopCard;


/* <Card.Body
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

           </Card.Footer> */


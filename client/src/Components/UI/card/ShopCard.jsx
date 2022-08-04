import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Badge, Button, ButtonGroup, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useConsole } from "../../../hooks/useConsole";
import { Context } from '../../..';
import { SRCimg } from '../../../utils/consts';
import ImgOK from "../ImgOK";









const ShopCard = ({ shopItem, ...props }) => {
    const [checked, setChecked] = useState(false);
    const { sklad: { type, quant, id: skladId }, price, title } = shopItem;
    const { prod } = useContext(Context)


    const toggle = () => {

        setChecked(prev => !prev)
    }
    useEffect(() => {
        checked ? props?.add(shopItem) : props?.rem(shopItem)

    }, [checked]);
    return (
        <Card className="mt-2 mx-1"
            // style={ { width: '45vh' } }
            style={ { border: checked ? "3px solid green" : "", width: '25vw' } }
        >

            <Card.Header className="d-flex justify-content-between"
            >
                <Card.Text as="h4">{ title || type?.name }</Card.Text>
                <Card.Text as="h4"> { price } руб.</Card.Text>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <ImgOK type={ type } />

                    </Col>
                    <Col>
                        <ListGroup numbered>

                            { type?.info.map(i =>
                                <ListGroupItem
                                    as={ "li" }
                                    className="mb-1"
                                    action
                                    variant="secondary"
                                    key={ i.id }
                                >
                                    { i.desc }
                                </ListGroupItem>
                            )
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Body>

            <Card.Footer as={ "h5" }
                className="d-flex justify-content-around "
            >
                <ButtonGroup>
                    <Button
                        variant='outline-success' onClick={ toggle }
                    >
                        { checked ?
                            <span className="material-icons">done</span>
                            :
                            <span className="material-icons">add_chart</span> }
                    </Button>
                    <Button variant='outline-danger' >
                        <span className="material-icons">bookmark_add</span>
                    </Button>
                </ButtonGroup>
                <ListGroupItem className='bg-secondary d-flex flex-row justify-content-between' >
                    <span>НА СКЛАДЕ</span>
                    <Badge
                        bg={ quant <= 2 ? "warning" : "light" }
                        text="dark"
                        className="mx-2"

                    >
                        { quant } шт.
                    </Badge>
                </ListGroupItem>
            </Card.Footer>
        </Card>
    );
}

export default ShopCard;

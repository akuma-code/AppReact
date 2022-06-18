import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useConsole } from "../../../hooks/useConsole";
import { Context } from '../../..';

const ShopCard = ({ shopItem }) => {
    const { id, shop, type, quant, typeId } = shopItem;







    return (
        <Card className="mt-2 mx-1"
            style={ { width: '40vh' } }>
            <Card.Header className="d-flex justify-content-between"
            >
                <Card.Text as="h4">{ shop?.title || type?.name }</Card.Text>
                <Card.Text as="h4"> { shop?.price } руб.</Card.Text>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Img
                            src={ `${process.env.REACT_APP_API_URL}/${type.img}` } />
                    </Col>
                    <Col>
                        {/* { type?.info.map(i =>
                            <Card.Text key={ i.id }>{ i.desc }</Card.Text>)
                        } */}
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>

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
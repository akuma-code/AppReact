import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const BigTaskCard = (props, children) => {



    return (
        <Card {...props}>
            <Card.Title>
                CardTask
            </Card.Title>
            <Card.Body>
                <Card.Text>

                </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    );
}

export default BigTaskCard;

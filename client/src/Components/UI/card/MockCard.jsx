import React from 'react';
import { Card, CloseButton } from 'react-bootstrap';
import { SRCimg } from '../../../utils/consts'
const MockCard = (props) => {
    return (
        <Card
            { ...props }
            className="d-flex "
        >
            <Card.Title className="text-center ">
                OK Mock
            </Card.Title>
            <Card.Img
                // className='place-self-center'
                src={ SRCimg + "2c4303e4-2f50-4918-b312-3f864385892e.jpg" }
                alt='NO PICTURE'
            // style={{ height: "150px", width: "150px" }}

            />
        </Card>
    );
}

export default MockCard;

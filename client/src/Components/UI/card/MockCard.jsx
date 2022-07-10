import React from 'react';
import { Card, CloseButton } from 'react-bootstrap';
import { SRCimg } from '../../../utils/consts'
const MockCard = (props) => {
    return (
        <Card
            {...props}
            className="d-flex "
        >
            <Card.Title className="text-center ">
                OK Mock
            </Card.Title>
            <Card.Img
                // className='place-self-center'
                src={SRCimg + "30dc7df1-1a3f-4ca0-81ce-45818e9a67e4.jpg"}
                alt='NO PICTURE'
            // style={{ height: "150px", width: "150px" }}

            />
        </Card>
    );
}

export default MockCard;

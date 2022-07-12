import React from 'react';
import { Card } from 'react-bootstrap';

const TypeCard = (props) => {
    const { type } = props
    return (
        <Card bg={ "success" }
            { ...props }>
            <Card.Title as={ "h2" } className="text-center ">
                { type.name }
            </Card.Title>
            <Card.Img
                className="mx-auto"
                src={ `${process.env.REACT_APP_API_URL}/${type?.img || "noimage.jpg"}` }
                alt='NO PICTURE'
                style={ { height: "fit-content" } }

            />
        </Card>
    );
}

export default TypeCard;

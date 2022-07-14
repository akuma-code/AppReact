import React from 'react';
import { Card } from "react-bootstrap";

const ImgOK = (props) => {
    return (
        <Card.Img
            { ...props }
            className="mx-auto"
            src={ `${process.env.REACT_APP_API_URL}/${props?.type.img || "noimage.jpg"}` }
            alt='NO PICTURE'
            style={ { height: "fit-content" } }

        />
    );
}

export default ImgOK;

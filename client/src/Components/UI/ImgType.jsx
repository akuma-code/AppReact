import React from 'react';
import { Image } from "react-bootstrap";

const Imgtype = ({ imgName }) => {
    return (
        <Image
            fluid
            src={`${process.env.REACT_APP_API_URL}/${imgName}`}
        />
    );
}

export default Imgtype;

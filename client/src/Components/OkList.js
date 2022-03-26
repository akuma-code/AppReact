import { observer } from "mobx-react-lite"
import React from 'react'
import { useContext } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { Context } from "..";
import OkItem from "./OkItem";

const OkList = observer(() => {
    const { ogo } = useContext(Context);
    return (
        <Row className="d-flex">
            { ogo.types.map(item =>
                <OkItem key={ item.id } okitem={ item } />
            ) }
        </Row>
    )
})

export default OkList
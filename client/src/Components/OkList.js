import { observer } from "mobx-react-lite"
import React from 'react'
import { useContext, useState } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { Context } from "..";
import OkItem from "./OkItem";

const OkList = observer(({ items }) => {

    return (
        <Row className="d-flex">
            {items.map(item =>
                <OkItem
                    key={item.id}
                    okitem={item}
                />
            )}
        </Row>
    )
})

export default OkList
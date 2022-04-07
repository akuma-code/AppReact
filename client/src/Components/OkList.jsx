import { observer } from "mobx-react-lite"
import React from 'react'
import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import OkItem from "./OkItem.jsx";

const OkList = ({ items }) => {

    return (
        <Container className="d-flex flex-wrap border">
            {items && items.map(item =>
                <OkItem
                    key={item.id}
                    okitem={item}
                />
            )}
        </Container>
    )
}

export default OkList
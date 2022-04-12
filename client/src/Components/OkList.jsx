import { observer } from "mobx-react-lite"
import React from 'react'
import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import OkItem from "./OkItem.jsx";
import ShopCard from "./UI/card/ShopItem";


const OkList = observer(({ items }) => {

    return (
        <Container className="d-flex flex-wrap border">
            { items && items.map(item =>
                <ShopCard
                    key={ item.id }
                    shopItem={ item }
                />
            ) }
        </Container>
    )
})

export default OkList
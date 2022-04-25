import { observer } from "mobx-react-lite"
import React from 'react'
import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import OkItem from "./OkItem.jsx";
import ShopCard from "./UI/card/ShopItem";
import SkladCard from "./UI/card/SkladCard";

const OkList = observer(({ items }) => {

    return (
        <Container className="d-flex flex-wrap border">
            {items && items.map(item =>
                <SkladCard
                    key={item.id}
                    skladItem={item}
                />
            )}
            <div><h4 className="mt-2">SKLAD</h4></div>
            {items && items.map(item =>
                <ShopCard
                    key={item.id}
                    shopItem={item}
                />
            )}
            <h4 className="mt-2">SHOP</h4>

        </Container>
    )
})

export default OkList
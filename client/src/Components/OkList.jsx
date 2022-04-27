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


        </Container>
    )
})

export default OkList
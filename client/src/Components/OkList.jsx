import { observer } from "mobx-react-lite"
import React from 'react'
import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import OkItem from "./OkItem.jsx";
import ShopCard from "./UI/card/ShopCard";
import SkladCard from "./UI/card/SkladCard";

const OkList = ({ items }) => {

    return (
        items.map(item =>
            <SkladCard
                key={ item.id }
                skladItem={ item }
            />
        )



    )
}

export default OkList
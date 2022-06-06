import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../..";
import { useCallCount } from "../../hooks/useConsole";
import { fetchPositions } from "../../http/shopAPI";


const ShopTab = observer(({ shopItems }) => {
    const { shop } = useContext(Context);
    useEffect(() => {
        useCallCount("ShopTab")("uE")
        fetchPositions().then(data => shop.setShopItems(data))
    }, [])
    return (
        <div>
            <ul>
                { shop.shopItems.map((item, idx) => (
                    <li key={ idx }>title: { item.title } || ID: { item.id } || Price: { item.price } rub</li>
                )) }
            </ul>
        </div>
    );
})

export default ShopTab;

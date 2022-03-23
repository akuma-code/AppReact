import React, { useState } from 'react';
import StoreCard from "./Components/UI/card/StoreCard";
import Navbar from "./Components/navbar/Navbar";

import './styles/app.css'
import { _getData } from './utils/useMockData';



function App() {
    const mocklist = [
        {
            name: "OK01",
            amount: 5,

            options: {
                price: 3200,
                size: '1000 x 1170'
            }
        },
        {
            name: "OK02",
            amount: 5,
            options: {
                price: 4500,
                size: '1000 x 1170'
            }
        },
        {
            name: "OK03",
            amount: 5,
            options: {
                price: 5400,
                size: '1000 x 1170'
            }
        },
    ]
    const tojs = JSON.stringify(mocklist);
    console.log(mocklist)

    return (
        <div className="app__main">
            <Navbar />
            {mocklist.map(ok =>
                <StoreCard
                    price={ok.options.price}
                    amount={ok.amount}
                    size={ok.options.size}
                    key={ok.name}
                />
            )}


        </div>
    );
}

export default App
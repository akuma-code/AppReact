import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import StoreCard from "./Components/card/StoreCard";
import Navbar from "./Components/navbar/Navbar";

import './styles/app.css'



function App() {


    return (
        <div className="app__main">
            <Navbar />
            <StoreCard
                price='3200'
                amount='4'
                size='1000 x 1170'
            />


        </div>
    );
}

export default App
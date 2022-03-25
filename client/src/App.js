import React, { useState } from 'react';
import StoreCard from "./Components/UI/card/StoreCard";
import NavbarBTS from "./Components/navbar/NavbarBTS.js";
import path from 'path'
import './styles/app.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";




function App() {

    return (
        <BrowserRouter>
            <NavbarBTS />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App
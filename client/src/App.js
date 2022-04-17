import React, { useContext, useState, useEffect } from 'react';
import NavbarBT from "./Components/navbar/NavbarBTS.js";
import './styles/app.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap';




const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))

    }, []);

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <BrowserRouter>
            <NavbarBT />
            <AppRouter />
        </BrowserRouter>
    );
})

export default App
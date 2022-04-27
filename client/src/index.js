import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OgoStore from "./store/OgoStore";
import ShopStore from "./store/ShopStore";
import SkladStore from './store/SkladStore';
import UserStore from "./store/UserStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={ {
        user: new UserStore(),
        ogo: new OgoStore(),
        sklad: new SkladStore(),
        shop: new ShopStore()
    } }>
        <App />
    </Context.Provider>,
    document.getElementById('root')
)
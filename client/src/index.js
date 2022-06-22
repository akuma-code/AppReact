import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OgoStore from "./store/OgoStore";
import ProdQueryStore from "./store/ProdQueryStore";
import ShopStore from "./store/ShopStore";
import SkladStore from './store/SkladStore';
import UserStore from "./store/UserStore";


export const Context = createContext(null)
const Stores = {
    user: new UserStore(),
    ogo: new OgoStore(),
    sklad: new SkladStore(),
    shop: new ShopStore(),
    prod: new ProdQueryStore()
}


ReactDOM.render(
    <Context.Provider value={{
        ...Stores
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
)
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OgoStore from "./store/OgoStore";
import SkladStore from './store/SkladStore';
import UserStore from "./store/UserStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        ogo: new OgoStore(),
        sklad: new SkladStore()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
)
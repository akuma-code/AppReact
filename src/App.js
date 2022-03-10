import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Counter from './Components/Counter';
import './styles/app.css'



function App() {
    const [value, setValue] = useState('')

    function inp(e) {
        setValue(e.target.value)
    }

    return (
        <div className="app_main">
            <Counter />
            <Counter />
            <Counter />
            <input
                style="margin: 10px"
                type="text"
                placeholder="VALUE"
                value={value}
                onChange={inp}
            ></input>
            <h3>{value}</h3>

        </div>
    );
}

export default App
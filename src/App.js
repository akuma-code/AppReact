import React, {useState} from 'react';
import ReactDOM from 'react-dom';


function App() {
    let [state, setState] = useState(0)
    const [value, setValue] = useState('input txt')
    function increment() {
        setState(state + 1)
        console.log('state :>> ', state);
    }
    function decrement() {
        setState(state - 1)
    }

    function showValue() {
        setValue()
    }
    return (
        <div className={"app_main"}>
            <h1>{state}</h1>
            <h3>{value}</h3>
            <input
                type="text"
                placeholder="VALUE"
                value={value}
                onChange={e => setValue(e.target.value)}
            ></input>
            <button onClick={increment}>MORE</button>
            <button onClick={decrement}>LESS</button>
        </div>
    );
}

export default App
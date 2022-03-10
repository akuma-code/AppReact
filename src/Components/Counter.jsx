import React, {useState} from 'react';

const Counter = function () {
    const [state, setState] = useState(0);
    function increment() {
        setState(state + 1)
    }
    function decrement() {
        setState(state - 1)
    }
    return (
        <div>
            <h1>{state}</h1>
            <button onClick={increment}>MORE</button>
            <button onClick={decrement}>LESS</button>
        </div>
    );
}

export default Counter
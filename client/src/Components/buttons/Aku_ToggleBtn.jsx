import React, { useState, useContext } from 'react';
import { ToggleButton } from "react-bootstrap";

const AkuToggleBtn = ({ props, clickHandler, btnName }) => {


    const [checked, setChecked] = useState(props.checked);

    return (

        <ToggleButton
            { ...props }
            type="checkbox"
            checked={ checked }
            size="sm"
            className="mt-1"
            value={ "1" }
            variant={ "outline-primary" }
            onChange={ (e) => setChecked(e.currentTarget.checked) }
            onClick={ clickHandler }
        >
            { checked ? "Добавлено" : btnName }
        </ToggleButton>
    );
}

export default AkuToggleBtn;

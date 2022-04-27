import React from 'react';
import { Button, ButtonGroup } from "react-bootstrap";

const CtrlBtns_Sklad = ({ handlers }) => {
    const { createHandler, getAll, getOne, clearAll } = handlers
    return (
        <ButtonGroup vertical
        >

            <Button onClick={createHandler}>Create New</Button>
            <Button onClick={() => getAll()}>getAll</Button>
            <Button onClick={() => getOne()}>getOne</Button>
            {/* <Button onClick={}>deleteOne</Button> */}
            <Button onClick={() => clearAll()}>Clear ALL</Button>

        </ButtonGroup>
    );
}

export default CtrlBtns_Sklad;

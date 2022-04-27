import React from 'react';
import { Button, ButtonGroup } from "react-bootstrap";

const CtrlBtns_Type = ({ props }) => {

    return (
        <ButtonGroup vertical { ...props }
            className="mt-2">

            <Button>Create New</Button>
            <Button>getAll</Button>
            <Button>getOne</Button>
            <Button>deleteOne</Button>
            <Button>Clear ALL</Button>

        </ButtonGroup>
    );
}

export default CtrlBtns_Type;

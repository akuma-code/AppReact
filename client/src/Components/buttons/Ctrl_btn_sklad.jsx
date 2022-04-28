import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from "react-bootstrap";
import { Context } from "../..";


const CtrlBtns_Sklad = observer(({ handlers }) => {
    const { sklad } = useContext(Context)
    const { createHandler, getAll, getOne, clearAll, activeItem } = handlers
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        sklad.selectedItem.id ? setIsDisabled(false) : setIsDisabled(true)

    }, [activeItem.id]);


    return (
        <ButtonGroup vertical

        >

            <Button onClick={ createHandler }>Create New</Button>
            <Button onClick={ () => getAll() }>get All</Button>
            <Button onClick={ () => getOne(activeItem.id) } disabled={ isDisabled }>get One</Button>
            <Button variant="danger" onClick={ () => clearAll(activeItem.id) } disabled={ isDisabled }>delete One</Button>
            <Button variant="danger" onClick={ () => clearAll() }>Clear ALL</Button>

        </ButtonGroup>
    );
})

export default CtrlBtns_Sklad;

import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from 'react';
import { ListGroup, Button, } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTypes } from "../http/typesAPI";
import { OKNO_ROUTE } from "../utils/consts";
import AkuToggleBtn from "./buttons/Aku_ToggleBtn";

const Dblist = observer(({ dbitem }) => {

    const history = useHistory()
    const { ogo } = useContext(Context)
    const [types, setTypes] = useState([])
    const [checked, setChecked] = useState(false)
    const [shop, setShop] = useState([])



    useEffect(() => {
        fetchTypes().then(data => ogo.setTypes(data))
    }, [types])


    const deleteHandler = (id) => {
        removeType(id)
        fetchTypes().then(data => setTypes(data))
    }


    const addToShop = (item) => {
        setShop(item)
        ogo.setShop(item)
    }
    return (
        <ListGroup>
            <ListGroup.Item className='d-flex flex-column'>
                <ListGroup.displayName>
                    Type ID: { dbitem.id }
                </ListGroup.displayName>


                <AkuToggleBtn
                    clickHandler={ () => addToShop(dbitem) }
                    btnName='Добавить на главную'
                    props={ {
                        id: dbitem.id,
                        checked: checked
                    } }
                >

                </AkuToggleBtn>
                <Button
                    size="sm"
                    className="mt-1"
                    variant={ "outline-secondary" }
                    onClick={ () => history.push(OKNO_ROUTE + '/' + dbitem.id) }
                >Открыть
                </Button>
                <Button
                    className="mt-1"
                    variant={ "outline-danger" }
                    onClick={ () => deleteHandler(dbitem.id) }
                >Удалить тип
                </Button>
            </ListGroup.Item>
        </ListGroup>
    );
})

export default Dblist;
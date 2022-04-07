import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from 'react';
import { ListGroup, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTypes, removeType } from "../http/typesAPI";
import { OKNO_ROUTE } from "../utils/consts";
import AkuToggleBtn from "./buttons/Aku_ToggleBtn";
import Tabletype from "./tables/TableType";


const Dblist = observer(({ dbitem }) => {

    const history = useHistory()
    const { ogo } = useContext(Context)
    const [types, setTypes] = useState([])
    const [checked, setChecked] = useState(false)
    const [shop, setShop] = useState([])



    useEffect(() => {
        fetchTypes().then(data => ogo.setTypes(data))
    }, [])


    const deleteHandler = (id) => {
        removeType(id)
        fetchTypes().then(data => ogo.setTypes(data))
    }



    return (
        // <ListGroup>
        <React.StrictMode>
            <ListGroup.Item className='d-flex flex-column'>
                <ListGroup.displayName>
                    Type ID: {dbitem.id}
                </ListGroup.displayName>
                <Button
                    size="sm"
                    className="mt-1"
                    variant={"outline-secondary"}
                    onClick={() => history.push(OKNO_ROUTE + '/' + dbitem.id)}
                >Открыть
                </Button>
                <Button
                    className="mt-1"
                    variant={"outline-danger"}
                    onClick={() => deleteHandler(dbitem.id)}
                >Удалить тип
                </Button>
            </ListGroup.Item>
        </React.StrictMode>
        // </ListGroup>
    );
})

export default Dblist;

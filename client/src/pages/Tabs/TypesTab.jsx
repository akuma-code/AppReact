import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from 'react';
import { Button, Image, Table } from "react-bootstrap";
import { fetchTypes } from "../../http/typesAPI";
import { Context } from "../..";
const TypesTab = observer(({ typesItems }) => {
    const [types, setTypes] = useState([]);
    const [keys, setKeys] = useState([])
    const { ogo } = useContext(Context);


    useEffect(() => {
        setTypes(typesItems)
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    {/* { keys && keys.map((key, ind) => <th key={ ind }>{ key }</th>) } */ }
                </tr>
            </thead>
            <tbody>
                { types?.map((type, ind) =>
                    <tr key={ ind }>
                        <td>{ ind + 1 }</td>
                        <td>{ type.id }</td>
                        <td>{ type.name }</td>
                        <td><Image height={ 50 } src={ process.env.REACT_APP_API_URL + '/' + type.img } /></td>
                        <td>
                            <Button
                                onClick={ () => del(type.id) }
                                variant={ "outline-danger" }
                            >Удалить</Button>
                        </td>
                    </tr>
                ) }
            </tbody>
        </Table>
    );
})

export default TypesTab;

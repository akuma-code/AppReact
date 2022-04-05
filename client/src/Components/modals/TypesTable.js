import { observer } from "mobx-react-lite";
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Table, Button, Image } from "react-bootstrap";
import { Context } from "../..";
import { fetchTypes, removeType } from "../../http/typesAPI";

const TypesTable = observer(({ show, onHide }) => {
    const [types, setTypes] = useState([]);
    const [keys, setKeys] = useState([])
    const { ogo } = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => {
            setKeys(Object.keys(data[0]))
            ogo.setTypes(data)
            setTypes(data)
        })
    }, [])
    useEffect(() => {
        ogo.setTypes(types)

    }, [types]);

    const del = (id) => {
        removeType(id)
        fetchTypes().then(data => setTypes(data))
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            centered
        >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        {keys.map((key, ind) => <th key={ind}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {types.map((type, ind) =>
                        <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{type.id}</td>
                            <td>{type.type}</td>
                            <td>{type.price}</td>
                            <td><Image height={50} src={process.env.REACT_APP_API_URL + '/' + type.img} /></td>
                            <td>{type.createdAt}</td>
                            <td>{type.updatedAt}</td>
                            <td>{type.shopId}</td>
                            <td>
                                <Button
                                    onClick={() => del(type.id)}
                                    variant={"outline-danger"}
                                >Удалить</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Modal>
    );
})

export default TypesTable;

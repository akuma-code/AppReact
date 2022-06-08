import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { fetchTypes } from "../../http/typesAPI";
import { Context } from "../..";
import SideBarTypes from "../../Components/sidebar/SideBarTypes";


const TypesTab = observer(({ typeItems }) => {
    const [types, setTypes] = useState([]);
    const [keys, setKeys] = useState([])
    const { ogo } = useContext(Context);

    useLayoutEffect(() => {
        fetchTypes().then(data => setTypes(data))

    }, [])


    return (
        <Container fluid>
            <Row>
                <Col md={ 1 } bg='dark'>
                    <SideBarTypes />
                </Col>
                <Col md={ { offset: 0 } }>
                    <Row>
                        { types?.map(type =>
                            <div key={ type.id }>
                                <div>ID:  { type.id }</div>
                                <div>Type: { type.name }</div>
                                <hr />
                            </div>
                        ) }
                    </Row>

                </Col>
            </Row>
        </Container>
    );
})

export default TypesTab;

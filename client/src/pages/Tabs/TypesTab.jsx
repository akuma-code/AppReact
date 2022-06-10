import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { clearTypes, fetchTypes } from "../../http/typesAPI";
import { Context } from "../..";
import SideBarTypes from "../../Components/sidebar/SideBarTypes";
import CreateType from "../../Components/modals/CreateType";


const TypesTab = observer(() => {
    const [types, setTypes] = useState([]);
    const [keys, setKeys] = useState([])
    const { ogo } = useContext(Context);
    const [previewType, setPreviewType] = useState({})

    const toggleSelect = (type) => {
        if (type.id === ogo.selectedType.id) ogo.setSelectedType({})
        else ogo.setSelectedType(type)
    }
    useEffect(() => {
        setPreviewType(ogo.selectedType)
        return () => {
            fetchTypes().then(data => setTypes(data))
        };
    }, [ogo.selectedType]);


    useLayoutEffect(() => {
        fetchTypes().then(data => setTypes(data))

    }, [])

    return (
        <Container fluid>
            <Row>
                <Col sm={ 1 }
                    className='d-flex justify-content-center'
                    style={ { minWidth: "190px" } }>
                    <SideBarTypes

                    />
                </Col>
                <Col sm={ { offset: 0 } }>
                    <Row>
                        { types?.map(type =>
                            <div key={ type.id }
                                onClick={ () => toggleSelect(type) }
                                className={ type.id === ogo.selectedType.id ? "bg-info " : "bg-light " }
                                style={ { cursor: "pointer", border: "1px solid black", } }>
                                <div>ID:  { type.id }</div>
                                <div>Тип: { type.name }</div>
                                { type?.info.map((i, idx) =>
                                    <div key={ idx }>{ idx + 1 }. { i.desc }</div>

                                ) }

                            </div>
                        ) }
                    </Row>

                </Col>
                <Col>
                    <Row>
                        <div>
                            <h3>{ previewType.name }</h3>
                            <Image src={ `${process.env.REACT_APP_API_URL}/${previewType?.img || "noimage.jpg"}` }
                                height="200px"

                            />
                        </div>

                    </Row>
                </Col>
            </Row>

        </Container >
    );
})

export default TypesTab;

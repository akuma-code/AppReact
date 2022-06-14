import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Button, ButtonGroup, Col, Container, Form, Image, InputGroup, Row, } from "react-bootstrap";
import { clearTypes, fetchTypes } from "../../http/typesAPI";
import { Context } from "../..";
import SideBarTypes from "../../Components/sidebar/SideBarTypes";
import CreateType from "../../Components/modals/CreateType";
import PreviewType from "../../Components/UI/card/PreviewType";
import EditTypeForm from "../../Components/UI/inputs/EditTypeForm";



const TypesTab = observer(() => {
    const [types, setTypes] = useState([]);
    const [keys, setKeys] = useState([])
    const { ogo } = useContext(Context);
    const [previewType, setPreviewType] = useState({ info: [] })
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [info, setInfo] = useState([])
    const [showName, setShowName] = useState(false)
    const [showInfo, setShowInfo] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const isSelected = type => type.id === ogo.selectedType.id

    const toggleSelect = (type) => {
        if (isSelected(type)) ogo.setSelectedType({})
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
                <Col sm={1}
                    className='d-flex justify-content-center'
                    style={{ minWidth: "190px" }}>
                    <SideBarTypes
                    />
                </Col>
                <Col sm={3}>
                    <Row>
                        {types?.map(type =>
                            <div key={type.id}
                                onClick={() => toggleSelect(type)}
                                className={isSelected(type) ? "bg-info " : "bg-light "}
                                style={{ cursor: "pointer", border: "1px solid black", fontSize: "1.5rem" }}>
                                <b>Тип:</b> {type.name} <em>(ID: {type.id})</em>
                            </div>
                        )}
                    </Row>

                </Col>
                <Col>
                    <Row>
                        <PreviewType type={previewType} />
                        {previewType.info && <EditTypeForm type={previewType} />}
                    </Row>
                </Col>
            </Row>

        </Container>
    );
})

export default TypesTab;

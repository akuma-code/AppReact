import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Badge, Button, ButtonGroup, Col, Container, Form, Image, InputGroup, Row, } from "react-bootstrap";
import { clearTypes, fetchOneType, fetchTypes } from "../../http/typesAPI";
import { Context } from "../..";
import SideBarTypes from "../../Components/sidebar/SideBarTypes";
import CreateType from "../../Components/modals/CreateType";
import PreviewType from "../../Components/UI/card/PreviewType";
import EditTypeForm from "../../Components/UI/inputs/EditTypeForm";
import { useSpyState } from "../../hooks/useConsole";



const TypesTab = observer(() => {
    const { ogo } = useContext(Context);
    const [types, setTypes] = useState([]);
    const [keys, setKeys] = useState([])
    const [currentType, setCurrentType] = useState({ info: [] })
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [info, setInfo] = useState([])
    const [showName, setShowName] = useState(false)
    const [showInfo, setShowInfo] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);


    const isSelected = type => type.id === ogo.selectedType.id

    const toggleSelect = (type) => {
        if (isSelected(type)) {
            setShowEditForm(true)

        }
        else {
            setShowEditForm(false)
            ogo.setSelectedType(type)
        }
    }

    useEffect(() => {
        fetchTypes().then(data => {
            ogo.setTypes(data);
            setTypes(data)
        })

        return () => {

        };
    }, []);


    useEffect(() => {
        fetchTypes().then(data => setTypes(data))
        fetchOneType(ogo.selectedType.id).then(data => setCurrentType(data))
    }, [ogo.selectedType])





    return (
        <Container fluid>
            <Row>
                <Col sm={ 1 }
                    className='d-flex justify-content-center'
                    style={ { minWidth: "190px" } }>
                    <SideBarTypes
                        show={ () => setShowEditForm(!showEditForm) }
                    />
                </Col>
                <Col sm={ 2 }>
                    <Row>
                        { types?.map(type =>
                            <div key={ type.id }
                                onClick={ (e) => { toggleSelect(type) } }
                                className={ `${isSelected(type) ? "bg-info " : "bg-light "} d-flex justify-content-between my-1` }
                                style={ { cursor: "pointer", border: "1px solid black", fontSize: "1.5rem", borderRadius: "10px" } }
                            >
                                <span><b>Тип:</b> { type.name }</span>
                                <Badge bg="dark" text="light" as={ Button }
                                    onClick={ () => toggleSelect(type) }
                                >&#9776;</Badge>
                            </div>
                        ) }
                    </Row>

                </Col>
                <Col sm={ 4 }>
                    <Row>
                        <PreviewType type={ currentType } />

                    </Row>
                </Col>
                <Col sm={ 4 }>
                    <Row>
                        { showEditForm && <EditTypeForm type={ currentType } /> }
                    </Row>
                </Col>
            </Row>

        </Container>
    );
})

export default TypesTab;

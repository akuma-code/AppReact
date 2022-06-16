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
import SettingsBadge from "../../Components/buttons/SettingsBadge";



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
        if (isSelected(type)) return setShowEditForm(false)

        else {
            ogo.setSelectedType(type)
            // setShowEditForm(true)

        }
    }

    useEffect(() => {
        fetchTypes().then(data => {
            ogo.setTypes(data);
            setTypes(data)
        })
        ogo.setSelectedType(currentType)
    }, []);


    useEffect(() => {
        fetchTypes().then(data => setTypes(data))


    }, [ogo.selectedType])





    return (
        <Container fluid>
            <Row>
                <Col sm={1}
                    className='d-flex justify-content-center'
                    style={{ minWidth: "190px" }}>
                    <SideBarTypes
                        show={() => setShowEditForm(!showEditForm)}
                    />
                    {info && info}
                </Col>
                <Col sm={2}>
                    <Row>
                        {types?.map(type =>
                            <div key={type.id}
                                onClick={() => ogo.setSelectedType(type)}
                                className={`${isSelected(type) ? "bg-info " : "bg-light "} d-flex justify-content-between my-1`}
                                style={{ cursor: "pointer", border: "1px solid black", fontSize: "1.6rem", borderRadius: "10px" }}
                            >
                                <span><b>Тип:</b> {type.name}</span>
                                <SettingsBadge
                                    item={type}
                                    onHide={setShowEditForm}
                                    as={Button}
                                // onClick={() => isSelected(type) ? setShowEditForm(true) : setShowEditForm(false)}
                                >&#9881;
                                </SettingsBadge>
                            </div>
                        )}
                    </Row>

                </Col>
                <Col sm={4}>
                    <Row>
                        <PreviewType type={ogo.selectedType} />

                    </Row>
                </Col>
                <Col sm={4}>
                    <Row>
                        {showEditForm && <EditTypeForm type={ogo.selectedType} />}
                    </Row>
                </Col>
            </Row>

        </Container>
    );
})

export default TypesTab;

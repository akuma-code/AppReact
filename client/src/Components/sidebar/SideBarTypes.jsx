import { observer } from "mobx-react-lite";
import React, { useState, useContext } from 'react';
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { Context } from "../..";
import { useConsole } from "../../hooks/useConsole";
import { clearTypes, removeType, fetchOneType } from "../../http/typesAPI";
import CreateType from "../modals/CreateType";


const SideBarTypes = observer(({ show, props }) => {

    const { ogo } = useContext(Context);
    const [showCreateType, setShowCreateType] = useState(false);
    const canOpen = () => ogo.selectedType.id ? true : false


    const isConfirmed = (text) => confirm(text);
    const removeTypes = () => isConfirmed("Удалить все типы") ? clearTypes() : null
    const deleteType = (id) => isConfirmed("Удалить тип") ? removeType(id) : null
    const getInfo = (type) => fetchOneType(type.id).then(data => { useConsole(data, alert) })
    return (
        <Row style={{ maxHeight: "300px" }}>
            <ButtonGroup vertical
                className="w-100 mb-1">
                <Button variant="success" onClick={() => setShowCreateType(true)}
                >Добавить новый тип
                </Button>
                <Button variant={canOpen() ? "danger" : "secondary"}
                    style={{ visibility: canOpen() ? "visible" : "hidden" }}
                    onClick={() => show()}
                > Открыть редактор
                </Button>
            </ButtonGroup>

            <ButtonGroup vertical
                className="w-100 my-1 mt-2">
                <Button variant={"danger"}
                    onClick={() => deleteType(ogo.selectedType.id)}
                >Удалить выбранный
                </Button>

            </ButtonGroup>
            <ButtonGroup vertical
                className="w-100 my-1">
                <Button
                    onClick={() => getInfo(ogo.selectedType)}
                >ИНФО
                </Button>
            </ButtonGroup>
            <ButtonGroup
                size="lg"
                vertical
                className="mt-5">
                <Button variant="danger"
                    onClick={() => removeTypes()}>Удалить все!</Button>
            </ButtonGroup>

            <CreateType
                show={showCreateType}
                onHide={() => setShowCreateType(false)}
            />
        </Row>
    );
})

export default SideBarTypes;

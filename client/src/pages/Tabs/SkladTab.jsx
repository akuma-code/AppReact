import React, { useContext, useState } from 'react';
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import CtrlBtns_Sklad from "../../Components/buttons/Ctrl_btn_sklad";
import CreateSkladPosition from "../../Components/modals/CreateSkladPosition";
import SkladCard from "../../Components/UI/card/SkladCard";
import { fetchOneSklad, fetchSklad, removeSkladPosition } from "../../http/SkladAPI";
import { observer } from "mobx-react-lite";



const SkladTab = observer(({ skladItems }) => {
    const { sklad } = useContext(Context)
    const getAll = () => fetchSklad().then(data => sklad.setSkladItems(data))
    const getOne = (id) => fetchOneSklad(id)
    const clearAll = (id) => removeSkladPosition(id)
    const createHandler = () => setSkladVisible(true)

    const [skladVisible, setSkladVisible] = useState(false);



    return (
        <Container className="d-flex flex-row flex-nowrap" >
            <Col md={ "auto" }
                style={ { background: "lightgray" } }>

                <CtrlBtns_Sklad handlers={ { createHandler, getAll, getOne, clearAll } } />
            </Col>
            <Col md={ "auto" }
                className="d-flex flex-wrap"
                style={ { background: "darkgray" } }
            >
                <CardGroup>
                    { skladItems.map(item =>
                        <SkladCard
                            key={ item.id }
                            skladItem={ item }

                        />
                    ) }
                </CardGroup>

            </Col>

            <CreateSkladPosition
                show={ skladVisible }
                onHide={ () => setSkladVisible(false) }
            />
        </Container>
    );
})

export default SkladTab;

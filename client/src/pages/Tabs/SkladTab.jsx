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
        <Container fluid >
            <Row>
                <Col md={1}
                    className='d-flex justify-content-center py-2'
                    style={{ background: "lightgray", height: "200px", minWidth: "150px" }}
                >
                    <CtrlBtns_Sklad
                        style={{ minWidth: "100px" }}
                        handlers={{ createHandler, getAll, getOne, clearAll }} />

                </Col>
                <Col sm={{ offset: 0 }}
                    style={{ background: "darkgray" }}
                    className="mx-1"
                >
                    <Row>
                        {skladItems.map(item =>
                            <SkladCard
                                key={item.id}
                                skladItem={item}

                            />
                        )}
                    </Row>

                </Col>
                <CreateSkladPosition
                    show={skladVisible}
                    onHide={() => setSkladVisible(false)}
                />
            </Row>
        </Container >
    );
})

export default SkladTab;

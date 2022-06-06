import React, { useContext, useEffect, useState } from 'react';
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import CtrlBtns_Sklad from "../../Components/buttons/Ctrl_btn_sklad";
import CreateSkladPosition from "../../Components/modals/CreateSkladPosition";
import SkladCard from "../../Components/UI/card/SkladCard";
import { fetchOneSklad, fetchSklad, removeSkladPosition } from "../../http/SkladAPI";
import { observer } from "mobx-react-lite";
import EditSkladPosition from "../../Components/modals/EditSkladPosition";
import { useCallCount, useConsole } from "../../hooks/useConsole";
import CreateShopItem from '../../Components/modals/CreateShopItem';
import { fetchPositions } from "../../http/shopAPI";


const SkladTab = observer(() => {
    const { sklad, shop } = useContext(Context)
    const getAll = async () => {
        fetchSklad().then(data => setSkladPos(data));

    }
    const getOne = (id) => fetchOneSklad(id).then(data => useConsole(data))
    const clearAll = (id) => removeSkladPosition(id).then(data => useConsole(data)).finally(sklad.setSelectedItem(null))
    const onHide = () => setSkladVisible(true)
    const createShop = () => setShopVisible(true)
    const [activeItem, setActiveItem] = useState({});
    const [skladVisible, setSkladVisible] = useState(false);
    const [shopVisible, setShopVisible] = useState(false);
    const [skladPos, setSkladPos] = useState([])

    useEffect(() => {
        fetchSklad().then(data => setSkladPos(data));

    }, []);


    useEffect(() => {


        fetchSklad().then(data => {
            setActiveItem(sklad.selectedItem);
            setSkladPos(data)
        });
        return () => useCallCount("SkladTAB")("useEffect[sklad.selItem]")
    }, [sklad.selectedItem]);


    return (
        <Container fluid >
            <Row >
                <Col md={ 1 }
                    className='d-flex justify-content-center py-2'
                    style={ { background: "transparent", minWidth: "150px" } }

                >
                    <CtrlBtns_Sklad
                        style={ { minWidth: "100px" } }
                        handlers={ { onHide, getAll, getOne, clearAll, activeItem, createShop } } />

                </Col>
                <Col sm={ { offset: 0 } }
                    style={ { background: "darkgray" } }
                    className="mx-1"
                >
                    <Row>
                        { skladPos?.map(item =>
                            <SkladCard
                                key={ item.id }
                                skladItem={ item }
                                openModal={ () => setUpdateSkladVisible(true) }
                            />
                        ) }
                    </Row>

                </Col>
                <CreateSkladPosition
                    show={ skladVisible }
                    onHide={ () => setSkladVisible(false) }
                />
                <CreateShopItem
                    show={ shopVisible }
                    onHide={ () => setShopVisible(false) }
                />
            </Row>
        </Container>
    );
})

export default SkladTab;

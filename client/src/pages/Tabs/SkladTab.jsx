import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";
import CtrlBtns_Sklad from "../../Components/buttons/Ctrl_btn_sklad";
import CreateSkladPosition from "../../Components/modals/CreateSkladPosition";
import SkladCard from "../../Components/UI/card/SkladCard";
import { fetchOneSklad, fetchSklad, removeSkladPosition, skladClear } from "../../http/SkladAPI";
import { observer } from "mobx-react-lite";
import { useCallCount, useConsole } from "../../hooks/useConsole";
import CreateShopItem from '../../Components/modals/CreateShopItem';
import { fetchPositions } from "../../http/shopAPI";


const SkladTab = observer(() => {
    const { sklad, shop } = useContext(Context)
    const isConfirmed = (text) => confirm(text)

    const getAll = () => fetchSklad().then(data => setSkladPos(data))
    const getOne = (id) => fetchOneSklad(id).then(data => { useConsole(data[0], alert) })

    const updatePOS = () => {
        fetchSklad().then(data => sklad.setSkladItems(data))
        fetchPositions().then(data => shop.setShopItems(data))
    }

    const deleteItem = (id) => {
        if (isConfirmed("Удалить позицию со склада?")) removeSkladPosition(id)
            .then(data => sklad.setSelectedItem(null))
            .finally(updatePOS())
    }
    const clearAll = () => isConfirmed("Очистить склад полностью?") ? skladClear().then(data => updatePOS()) : null

    const createSkladModal = () => setSkladVisible(true)
    const createShopModal = () => setShopVisible(true)


    const [activeItem, setActiveItem] = useState({});
    const [skladVisible, setSkladVisible] = useState(false);
    const [shopVisible, setShopVisible] = useState(false);
    const [skladPos, setSkladPos] = useState([])

    useEffect(() => {
        fetchSklad().then(data => setSkladPos(data))
    }, []);


    useEffect(() => {
        fetchSklad().then(data => setSkladPos(data));
        return () => useCallCount("fetchSKLAD")("skladItems")
    }, [sklad.skladItems]);


    useEffect(() => {
        setActiveItem(sklad.selectedItem);
        return () => useCallCount("fetchSKLAD")("selectedItem")
    }, [sklad.selectedItem]);


    return (
        <Container fluid >
            <Row>
                <Col md={ 1 }
                    className='d-flex justify-content-center py-2'
                    style={ { background: "transparent", minWidth: "150px" } }

                >
                    <CtrlBtns_Sklad
                        style={ { minWidth: "150px" } }
                        handlers={ { onHide: createSkladModal, getAll, getOne, clearAll, deleteItem, activeItem, createShopModal } } />

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

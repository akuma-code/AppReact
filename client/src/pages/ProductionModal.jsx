import React, { useContext, useEffect, useState } from 'react';
import { Col, Modal, Row } from "react-bootstrap";
import { Context } from "..";
import TypeCard from "../Components/UI/card/TypeCard";
import { FetchingCenter } from "../hooks/useFetchingCenter";



const ProductionModal = ({ show, onHide }) => {
    const { prod, sklad } = useContext(Context)
    const [sklads, setSklads] = useState([]);
    useEffect(() => {
        FetchingCenter.fetchAll('sklad').then(data => setSklads(data))

    }, []);




    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
        >
            <Modal.Body as={ Row }>



                { sklads.map(sitem =>
                    <TypeCard
                        type={ sitem.type }
                        key={ sitem.id }
                    />) }


            </Modal.Body>

        </Modal>
    );
}

export default ProductionModal;

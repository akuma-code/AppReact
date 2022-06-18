import { observer } from "mobx-react-lite";
import React, { useContext, useState, useLayoutEffect } from 'react';
import { Badge, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../../..";
import { useConsole } from "../../../hooks/useConsole";
import { removeSkladPosition, updateSkladItem } from '../../../http/SkladAPI';
import { fetchOneType } from "../../../http/typesAPI";
import EditSkladPosition from "../../modals/EditSkladPosition";



const SkladCard = observer(({ skladItem }) => {
    const { id, type, quant } = skladItem;
    const { sklad } = useContext(Context)
    const [updateSkladVisible, setUpdateSkladVisible] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const [info, setInfo] = useState([]);

    const openModalUpdate = () => {
        setUpdateSkladVisible(true)
        sklad.setSelectedItem(skladItem)
    }

    function toggleSelect() {
        !isActive ? sklad.setSelectedItem(skladItem) : sklad.setSelectedItem({})
        setIsActive(!isActive)
    }

    useLayoutEffect(() => {
        fetchOneType(type?.id).then(data => setInfo(data.info))
    }, [])
    return (
        <Card style={{ width: '15rem', cursor: "pointer", border: "2px solid black" }} className="mt-2 mb-1 mx-2"

            bg={id === sklad.selectedItem.id ? "secondary" : "light"}
        >
            <Card.Body
                className='d-flex flex-column justify-content-between'
                onClick={toggleSelect}
            >
                <Card.Title as="h4"
                    className='d-flex flex-row justify-content-between'
                >
                    {type?.name}

                    <Badge as={Button}
                        bg="dark"
                        text="light"
                        onClick={openModalUpdate}>
                        &#9776;
                    </Badge>

                </Card.Title>

                <Card.Img
                    className="mx-auto"
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL}/${type?.img || "noimage.jpg"}`}
                    alt='NO PICTURE'

                />
                {skladItem.shop &&
                    <Badge
                        bg={"success"}
                        // style={{ position: "absolute", right: "-1rem", top: "-.5rem", width: "2rem" }}
                        // as={Button}
                        disabled
                    >
                        Добавлено на витрину &#9816;
                    </Badge>}
            </Card.Body>
            <Card.Footer as={"h4"}
                className="d-flex justify-content-center "
            >
                <ListGroupItem className='bg-secondary d-flex flex-row justify-content-around ' >
                    ВСЕГО
                    <Badge
                        bg="light"
                        text="dark"
                        className="pl-2"
                    >
                        {quant} шт.</Badge>
                </ListGroupItem>
            </Card.Footer>


            <EditSkladPosition
                show={updateSkladVisible}
                onHide={() => setUpdateSkladVisible(false)}
                skladItem={skladItem}
            />
        </Card>
    );
})

export default SkladCard;

import { observer } from "mobx-react-lite";
import React, { useContext, useState } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../../..";
import { useConsole } from "../../../hooks/useConsole";
import { removeSkladPosition, updateSkladItem } from '../../../http/SkladAPI';
import EditSkladPosition from "../../modals/EditSkladPosition";



const SkladCard = observer(({ skladItem }) => {
    const history = useHistory()
    const { id, type, quant } = skladItem;
    const { sklad } = useContext(Context)
    const [updateSkladVisible, setUpdateSkladVisible] = useState(false);
    const [isActive, setIsActive] = useState(false)


    const openModalUpdate = () => {
        setUpdateSkladVisible(true)
        sklad.setSelectedItem(skladItem)
    }

    function toggleSelect() {
        !isActive ? sklad.setSelectedItem(skladItem) : sklad.setSelectedItem({})
        setIsActive(!isActive)
    }


    return (
        <Card style={{ width: '14rem', cursor: "pointer", border: "2px solid black", height: "25rem" }} className="mt-2 mb-1 mx-2"

            bg={id === sklad.selectedItem.id ? "info" : "light"}
        >
            <Card.Body
                className='d-flex flex-column justify-content-between'
                onClick={toggleSelect}
            >
                <Card.Title as="h4">{type?.name}</Card.Title>
                <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL}/${type?.img || "noimage.jpg"}`}
                    alt='NO PICTURE'
                    width={"20"}
                />
                <ListGroup >
                    <ListGroupItem className='bg-light'>
                        {/* <div> ID типа: { type.id }</div> */}
                        <div> Осталось: {quant} шт.</div>
                    </ListGroupItem>

                    {type?.info && type.info.map((i, idx) => (
                        <ListGroupItem
                            key={idx}
                            style={{
                                backgroundColor: (idx % 2 === 0) ? "lightgray" : "darkgray",
                                fontSize: 10,
                                margin: 0,
                                padding: 0,
                                textAlign: "center"
                            }}
                        >
                            <p>{i.desc}</p>
                        </ListGroupItem>))
                    }

                </ListGroup>

            </Card.Body>
            <Card.Footer className="d-flex justify-content-between "
            >
                <Button
                    className="mx-auto"
                    variant="secondary"
                    size="lg"
                    onClick={() => openModalUpdate()}
                >
                    Редактировать
                </Button>
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

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
    }

    function toggleSelect() {
        !isActive ? sklad.setSelectedItem(skladItem) : sklad.setSelectedItem({})
        setIsActive(!isActive)
    }

    const addShop = () => {
        const form = new FormData();

        form.append('typeId', sklad.selectedItem.typeId)
        form.append('id', sklad.selectedItem.id)
        updateSkladItem(form).then(data => {
            onHide()
            useConsole(data)
        })
    }
    return (
        <Card style={{ width: '14rem', cursor: "pointer", border: "2px solid black", height: "25rem" }} className="mt-2 mb-1 mx-2"
            onClick={toggleSelect}
            bg={skladItem.id === sklad.selectedItem.id ? "info" : "light"}
        >
            <Card.Body
                className='d-flex flex-column justify-content-between'

            >
                <Card.Title as="h4">{type.name}</Card.Title>
                <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL}/${type?.img}` || 'http://localhost:5000/noimage.jpg'}
                    alt='NO PICTURE'
                    width={"80"}

                />
                <ListGroup >
                    <ListGroupItem className='bg-light'>
                        {/* <div> ID типа: { type.id }</div> */}
                        <div> Осталось: {quant}</div>
                    </ListGroupItem>

                    {type.info && type.info.map((i, idx) => (
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
                    size=""
                    onClick={() => openModalUpdate()}
                >
                    Изменить
                </Button>
                {/* <Button variant="outline-danger"
                    size="sm"
                    onClick={() => { }}
                    className="mx-1 w-100"
                    style={{ fontSize: "10px" }}
                >
                    Добавить на витрину
                </Button> */}
            </Card.Footer>
            <EditSkladPosition
                show={updateSkladVisible}
                onHide={() => setUpdateSkladVisible(false)}
                skladItem={skladItem}
            />
        </Card >
    );
})

export default SkladCard;

import { observer } from "mobx-react-lite";
import React, { useContext, useState, useLayoutEffect } from 'react';
import { Badge, Button, ButtonGroup, Card, Dropdown, DropdownButton, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../../..";
import { useConsole } from "../../../hooks/useConsole";
import { removeShopPosition } from "../../../http/shopAPI";
import { removeSkladPosition, updateSkladItem } from '../../../http/SkladAPI';
import { fetchOneType } from "../../../http/typesAPI";
import CreateShopItem from "../../modals/CreateShopItem";
import EditSkladPosition from "../../modals/EditSkladPosition";
import ImgOK from "../ImgOK";



const SkladCard = observer(({ skladItem }) => {
    const { id, type, quant } = skladItem;
    const { sklad } = useContext(Context)
    const [updateSkladVisible, setUpdateSkladVisible] = useState(false);
    const [shopVisible, setShopVisible] = useState(false);
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

    const removePos = (id) => {
        removeShopPosition(id).then(data => onHide())
    }
    return (
        <Card style={ { width: '15rem', cursor: "pointer", border: "2px solid black" } } className="mt-2 mb-1 mx-2"

            bg={ id === sklad.selectedItem.id ? "secondary" : "light" }
        >
            <Card.Body
                className='d-flex flex-column justify-content-between'
                onClick={ toggleSelect }
            >
                <Card.Title as="h4"
                    className='d-flex flex-row justify-content-between'
                >
                    { type?.name }
                    <Dropdown >
                        <Badge as={ Dropdown.Toggle }
                            bg="dark"
                            text="light"
                        >
                            &#9776;
                        </Badge>


                        <Dropdown.Menu>
                            <Dropdown.Item onClick={ openModalUpdate }
                            >
                                Редактировать
                            </Dropdown.Item>
                            { skladItem.shop ?

                                <Dropdown.Item
                                    onClick={ () => removeShopPosition(skladItem.shop.id) }
                                    className="bg-info">
                                    Убрать с витрины
                                </Dropdown.Item>
                                :
                                <Dropdown.Item onClick={ () => setShopVisible(true) }
                                >
                                    Добавить на витрину
                                </Dropdown.Item>
                            }
                            <Dropdown.Divider />
                            <Dropdown.Item
                                className="text-end"
                                onClick={ () => removeSkladPosition(skladItem.id) }
                            >
                                Удалить
                            </Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>


                </Card.Title>
                <ImgOK type={ skladItem.type } />

                { skladItem.shop &&
                    <Badge
                        bg={ "success" }
                        // style={{ position: "absolute", right: "-1rem", top: "-.5rem", width: "2rem" }}
                        // as={Button}
                        disabled
                    >
                        Добавлено на витрину &#9816;
                    </Badge> }
            </Card.Body>
            <Card.Footer as={ "h4" }
                className="d-flex justify-content-center "
            >
                <ListGroupItem className='bg-secondary d-flex flex-row justify-content-around ' >
                    ВСЕГО
                    <Badge
                        bg={ quant <= 2 ? "warning" : "light" }
                        text="dark"
                        className="mx-2"
                    >
                        { quant } шт.</Badge>
                </ListGroupItem>
            </Card.Footer>


            <EditSkladPosition
                show={ updateSkladVisible }
                onHide={ () => setUpdateSkladVisible(false) }
                skladItem={ skladItem }
            />
            <CreateShopItem
                item={ skladItem }
                show={ shopVisible }
                onHide={ () => setShopVisible(false) }
            />
        </Card>
    );
})

export default SkladCard;

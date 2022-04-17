import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Badge, Button, ButtonGroup, Card, CardGroup, Col, Container, ListGroup, Row, ToggleButton } from 'react-bootstrap'
import { Context } from '..';
import { fetchTypes, removeType } from '../http/typesAPI';
import { OKNO_ROUTE } from "../utils/consts";
import CreateType from "../Components/modals/CreateType";
import TypesTable from "../Components/modals/TypesTable";
import CreateShopPosition from "../Components/modals/CreateSkladItem"; import CreateSkladItem from "../Components/modals/CreateSkladItem";


const DBPage = observer(() => {
    // const history = useHistory()
    // const { ogo } = useContext(Context)
    // const [types, setTypes] = useState([])
    // const [checked, setChecked] = useState(false)
    // const [shop, setShop] = useState([])
    const [typeVisible, setTypeVisible] = useState(false);
    const [tabVisible, setTabVisible] = useState(false);
    const [shopVisible, setShopVisible] = useState(false);
    const [skladVisible, setSkladVisible] = useState(false);



    return (
        <React.StrictMode>
            <Container className='d-flex mt-3'
                fluid
            >
                <Row lg={1} className="border d-flex w-100 flex-wrap align-content-center"
                >
                    <ButtonGroup
                        horizontal="true"
                        className="mb-2"
                    >
                        <Button
                            className="btn  mt-2"
                            variant={"outline-dark"}
                            onClick={() => setTabVisible(true)}
                        >
                            Таблица типов
                        </Button>
                        <Button
                            className="btn  mt-2"
                            variant={"outline-dark"}
                            onClick={() => setTypeVisible(true)}
                        >
                            Добавить новый тип
                        </Button>
                        <Button
                            className="btn  mt-2"
                            variant={"outline-dark"}
                            onClick={() => setShopVisible(true)}
                        >
                            Добавить новую позицию (SHOP)
                        </Button>
                        <Button
                            className="btn  mt-2"
                            variant={"outline-dark"}
                            onClick={() => setSkladVisible(true)}
                        >
                            Добавить новую позицию (SKLAD)
                        </Button>
                    </ButtonGroup>
                </Row>
                <Row md={4}
                    className="d-flex justify-content-center">


                </Row>
                <CreateType
                    show={typeVisible}
                    onHide={() => setTypeVisible(false)}
                />
                <TypesTable
                    show={tabVisible}
                    onHide={() => setTabVisible(false)}
                />
                <CreateShopPosition
                    show={shopVisible}
                    onHide={() => setShopVisible(false)}
                />
                <CreateSkladItem
                    show={skladVisible}
                    onHide={() => setSkladVisible(false)}
                />
            </Container>
        </React.StrictMode>
    );

    {/* <ListGroup>
                        { ogo.types.map(typeItem =>
                            <ListGroup.Item key={ typeItem.id } className='d-flex flex-column'>
                                <div>
                                    id: { typeItem.id }
                                </div>
                                <div>
                                    type: { typeItem.type }
                                </div>
                                <AkuToggleBtn
                                    clickHandler={ () => addToShop(typeItem) }

                                    btnName='Добавить на главную'
                                    props={ {
                                        id: typeItem.id,
                                        checked: checked
                                    } }
                                >

                                </AkuToggleBtn>
                                <Button
                                    size="sm"
                                    className="mt-1"
                                    variant={ "outline-secondary" }
                                    onClick={ () => history.push(OKNO_ROUTE + '/' + typeItem.id) }
                                >Открыть
                                </Button>
                                <Button
                                    className="mt-1"
                                    variant={ "outline-danger" }
                                    onClick={ () => deleteHandler(typeItem.id) }
                                >Удалить тип
                                </Button>
                            </ListGroup.Item>
                        ) }
                    </ListGroup> */}

})

export default DBPage;

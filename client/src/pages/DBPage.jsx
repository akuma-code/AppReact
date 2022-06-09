import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap'
import { Context } from '..';
import { fetchTypes, removeType } from '../http/typesAPI';
import { OKNO_ROUTE } from "../utils/consts";
import CreateType from "../Components/modals/CreateType";
import TypesTable from "../Components/modals/TypesTable";
import CreateShopItem from "../Components/modals/CreateShopItem"; import CreateSkladItem from "../Components/modals/CreateShopItem";
import CreateSkladPosition from '../Components/modals/CreateSkladPosition';


const DBPage = observer(() => {

    const [typeVisible, setTypeVisible] = useState(false);
    const [tabVisible, setTabVisible] = useState(false);
    const [shopVisible, setShopVisible] = useState(false);
    const [skladVisible, setSkladVisible] = useState(false);



    return (
        <React.StrictMode>
            <Container className='d-flex mt-3'
                fluid
            >
                <Row lg={ 1 } className="border d-flex w-100 flex-wrap align-content-center"
                >
                    <ButtonGroup
                        horizontal="true"
                        className="mb-2"
                    >
                        <Button
                            className="btn  mt-2"
                            variant={ "outline-dark" }
                            onClick={ () => setTabVisible(true) }
                        >
                            Таблица типов
                        </Button>
                        <Button
                            className="btn  mt-2"
                            variant={ "outline-dark" }
                            onClick={ () => setTypeVisible(true) }
                        >
                            Добавить новый тип
                        </Button>
                        <Button
                            className="btn  mt-2"
                            variant={ "outline-dark" }
                            onClick={ () => setShopVisible(true) }
                        >
                            Добавить новую позицию (SHOP)
                        </Button>
                        <Button
                            className="btn  mt-2"
                            variant={ "outline-dark" }
                            onClick={ () => setSkladVisible(true) }
                        >
                            Добавить новую позицию (SKLAD)
                        </Button>
                    </ButtonGroup>
                </Row>
                <Row md={ 4 }
                    className="d-flex justify-content-center">


                </Row>
                <CreateType
                    show={ typeVisible }
                    onHide={ () => setTypeVisible(false) }
                />
                <TypesTable
                    show={ tabVisible }
                    onHide={ () => setTabVisible(false) }
                />
                <CreateShopItem
                    show={ shopVisible }
                    onHide={ () => setShopVisible(false) }
                />
                <CreateSkladPosition
                    show={ skladVisible }
                    onHide={ () => setSkladVisible(false) }
                />
            </Container>
        </React.StrictMode>
    );


})

export default DBPage;

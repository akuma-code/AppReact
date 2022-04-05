import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Badge, Button, ButtonGroup, Card, CardGroup, Col, Container, ListGroup, Row, ToggleButton } from 'react-bootstrap'
import { Context } from '..';
import { fetchTypes, removeType } from '../http/typesAPI';
import { OKNO_ROUTE } from "../utils/consts";
import Dblist from "../Components/DbList";
import CreateType from "../Components/modals/CreateType";
import TypesTable from "../Components/modals/TypesTable";


const DBPage = observer(() => {
    const history = useHistory()
    const { ogo } = useContext(Context)
    const [types, setTypes] = useState([])
    const [checked, setChecked] = useState(false)
    const [shop, setShop] = useState([])
    const [typeVisible, setTypeVisible] = useState(false);
    const [tabVisible, setTabVisible] = useState(false);


    useEffect(() => {
        fetchTypes().then(data => setTypes(data))

    }, [ogo.types])


    const deleteHandler = (id) => {
        removeType(id)
        fetchTypes().then(data => setTypes(data))
    }


    return (
        <React.StrictMode>
            <Container className='d-flex mt-3'
                fluid
            >
                <Row lg={2}>
                    <Col md={4}>
                        <ButtonGroup
                            vertical
                        >
                            <Button
                                variant={"outline-dark"}
                                onClick={() => setTabVisible(true)}
                            >
                                Получить типы из БД
                            </Button>
                            <Button
                                className="btn  mt-2"
                                variant={"outline-dark"}
                                onClick={() => setTypeVisible(true)}
                            >
                                Добавить новый тип
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={"auto"}
                        lg={5}
                    // style={ { width: 400, height: 400, overflowY: "auto", flexWrap: "wrap" } }
                    >
                        {types.map(type =>
                            <Card className="mt-1"
                                key={type.id}
                            >
                                <Card.Header
                                    style={{ background: "rgb(100, 100, 200)" }}>
                                    {type.type}
                                </Card.Header>
                                <Dblist dbitem={type}
                                ></Dblist>
                            </Card>
                        )}
                    </Col>
                </Row>
                <CreateType
                    show={typeVisible}
                    onHide={() => setTypeVisible(false)}
                />
                <TypesTable
                    show={tabVisible}
                    onHide={() => setTabVisible(false)}
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

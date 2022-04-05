import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Badge, Button, ButtonGroup, Card, CardGroup, Col, Container, ListGroup, Row, ToggleButton } from 'react-bootstrap'
import { Context } from '..';
import { fetchTypes, removeType } from '../http/typesAPI';
import { OKNO_ROUTE } from "../utils/consts";
import Dblist from "../Components/Dblist";
import CreateType from "../Components/modals/CreateType";
import Tabletype from '../Components/tables/TableType';


const DBPage = observer(() => {
    const history = useHistory()
    const { ogo } = useContext(Context)
    const [types, setTypes] = useState([])
    const [checked, setChecked] = useState(false)
    const [shop, setShop] = useState([])
    const [typeVisible, setTypeVisible] = useState(false);


    useEffect(() => {
        fetchTypes().then(data => {
            ogo.setTypes(data)
            setTypes(data)
        })
    }, [])


    const deleteHandler = (id) => {
        removeType(id)
        fetchTypes().then(data => setTypes(data))
    }


    const destruct = (item) => Object.entries(...item)
    return (
        <Container className='d-flex mt-3 flex-row'
            fluid
        >


            <Row
                className="w-100"
            >
                <Container className='my-2'>
                    <Col sm="4">
                        <ButtonGroup
                            horisontal

                        >
                            <Button
                                variant={"outline-dark"}
                                onClick={() => fetchTypes().then(data => setTypes(data))}
                            >
                                Получить данные из БД
                            </Button>
                            <Button
                                className="btn"
                                variant={"outline-dark"}
                                onClick={() => setTypeVisible(true)}
                            >
                                Добавить новый тип окна
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Container>
                {/* 
                <Container
                >
                    <CardGroup>
                        {ogo.types.map(type =>
                            <Card className="mt-1 d-flex"
                                key={type.id}
                                style={{ width: "10rem" }}
                            >
                                <Card.Header
                                    style={{ background: "rgb(100, 100, 200)" }}>
                                    <Card.Title> {type.type}  <Badge bg='info'>id:{type.id}</Badge></Card.Title>
                                </Card.Header>
                                <Dblist
                                    dbitem={type}

                                />
                            </Card>
                        )}
                    </CardGroup>
                </Container> */}
                <Tabletype
                    className="ml-2"
                    dbobjects={types}
                    header={types[0]}

                />
            </Row>
            <CreateType
                show={typeVisible}
                onHide={() => setTypeVisible(false)}
            />
        </Container>
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

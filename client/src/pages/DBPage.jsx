import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Button, ButtonGroup, Col, Container, ListGroup, Row, ToggleButton } from 'react-bootstrap'
import { Context } from '..';
import { fetchTypes, removeType } from '../http/typesAPI';
import { OKNO_ROUTE } from "../utils/consts";
import AkuToggleBtn from "../Components/buttons/Aku_ToggleBtn";

const DBPage = observer(() => {
    const history = useHistory()
    const { ogo } = useContext(Context)
    const [dbList, setDbList] = useState([])
    const [checked, setChecked] = useState(false)
    const [shop, setShop] = useState([])



    useEffect(() => {
        fetchTypes().then(data => ogo.setTypes(data))
    }, [dbList])


    const deleteHandler = (id) => {
        removeType(id)
        fetchTypes().then(data => setDbList(data))
    }

    const addToShop = (item) => {
        ogo.setShop(item)


    }
    const destruct = (item) => Object.entries(...item)
    return (
        <Container className='d-flex mt-2'>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button
                            onClick={ () => fetchTypes().then(data => setDbList(data)) }
                        >
                            Получить данные из БД
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col>
                    <ListGroup>
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
                    </ListGroup>
                </Col>
            </Row>


        </Container >
    );
})

export default DBPage;

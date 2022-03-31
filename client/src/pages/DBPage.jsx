import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Button, ButtonGroup, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Context } from '..';
import { fetchTypes, removeType } from '../http/typesAPI';

const DBPage = observer(() => {
    const history = useHistory()
    const { ogo } = useContext(Context)
    const [dbList, setDbList] = useState([])
    useEffect(() => {
        fetchTypes().then(data => setDbList(data))
    }, [])

    const destruct = (item) => Object.entries(...item)
    // console.log(destruct(dbList));
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
                        { dbList.map(typeItem =>
                            <ListGroup.Item key={ typeItem.id } className='d-flex flex-column'>
                                <div>
                                    id: { typeItem.id }
                                </div>
                                <div>
                                    type: { typeItem.type }
                                </div>
                                <Button
                                    variant={ "outline-danger" }
                                    onClick={ () => removeType(typeItem.id) }
                                >Удалить тип
                                </Button>
                            </ListGroup.Item>
                        ) }
                    </ListGroup>
                </Col>
            </Row>


        </Container>
    );
})

export default DBPage;

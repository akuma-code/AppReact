import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Button, ButtonGroup, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Context } from '..';
import { fetchTypes } from '../http/typesAPI';

const DBPage = observer(() => {
    const history = useHistory()
    const { ogo } = useContext(Context)
    const [dbList, setDbList] = useState([])
    const type_bd = () => fetchTypes().then(data => setDbList(data))
    useEffect(() => {
        type_bd()
    }, []);
    const destruct = (item) => Object.entries(...item)
    // console.log(destruct(dbList));
    return (
        <Container className='d-flex ml-0'>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button
                            onClick={() => type_bd()}
                        >
                            Получить данные из БД
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col>
                    <ListGroup>
                        {dbList.map(typeItem =>
                            <ListGroup.Item key={typeItem.id} className='d-flex '>
                                id: {typeItem.id}
                                <br></br>
                                type: {typeItem.type}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>


        </Container>
    );
})

export default DBPage;

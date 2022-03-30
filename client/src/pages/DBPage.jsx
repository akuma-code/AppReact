import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/app.css'
import { Button, Container, ListGroup } from 'react-bootstrap'

const DBPage = observer(() => {
    const history = useHistory()
    return (
        <Container className='d-flex ml-0'>
            <ListGroup>
                <ListGroup.Item>
                    <Button>
                        Получить данные из БД
                    </Button>
                </ListGroup.Item>

            </ListGroup>

        </Container>
    );
})

export default DBPage;

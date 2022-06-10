import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';

const PreviewType = observer(({ type }) => {

    const { img, info = [], name = "" } = type

    return (
        <Container>

            <Row>
                <Col>
                    <Image
                        src={`${process.env.REACT_APP_API_URL}/${img || "noimage.jpg"}`}
                    />
                </Col>
                <Col>
                    <h3>{name && name}</h3>
                    {info && info.map(i => <li key={i.id}>{i.desc}</li>)}
                </Col>
            </Row>
        </Container>
    );
})

export default PreviewType;

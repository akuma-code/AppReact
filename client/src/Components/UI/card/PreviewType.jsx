import { observer } from 'mobx-react-lite';
import React, { useLayoutEffect, useState } from 'react';
import { Card, Container, Row, Col, Image, ListGroup } from 'react-bootstrap';

const PreviewType = ({ type }) => {
    const { img, info = [], name = "" } = type

    return (
        <Container>
            {
                name && <ListGroup.Item
                    as={ "h3" }
                    variant="primary"
                >{ name }
                </ListGroup.Item>
            }
            <Row>
                <Col className="d-flex flex-row justify-content-center">
                    { img && <Image
                        style={ { maxWidth: "300px" } }
                        src={ `${process.env.REACT_APP_API_URL}/${img || "noimage.jpg"}` }
                        thumbnail
                    /> }
                </Col>
                <Col>
                    <ListGroup
                        as="ol"
                        numbered
                        variant={ "flush" }>

                        {
                            info.map(i => <ListGroup.Item
                                as={ "li" }
                                className="mb-1 fw-bold"
                                action
                                variant="secondary"
                                key={ i.id }
                            >{ i.desc }
                            </ListGroup.Item>)
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default PreviewType;

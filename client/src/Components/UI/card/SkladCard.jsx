import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { Button, Card, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../../..";
import { removeSkladPosition } from '../../../http/SkladAPI';



const SkladCard = observer(({ skladItem }) => {
    const history = useHistory()
    const { id, type, quant } = skladItem;
    const { sklad } = useContext(Context)


    return (
        <Card style={ { width: '13rem', cursor: "pointer" } } className="mt-2 mx-1"
            onClick={ () => sklad.setSelectedItem(skladItem) }
            bg={ skladItem.id === sklad.selectedItem.id ? "info" : "light" }
        >
            <Card.Body
                className='d-flex flex-column justify-content-between'

            >
                <Card.Title as="h4">{ type.name }</Card.Title>
                <Card.Img
                    variant="top"
                    src={ `${process.env.REACT_APP_API_URL}/${type?.img}` || 'http://localhost:5000/noimage.jpg' }
                    alt='NO PICTURE'

                />

                <ListGroup >
                    <ListGroup.Item className='bg-warning'>
                        <div> type_ID: { type.id }</div>
                        <div> Осталось: { quant }</div>
                    </ListGroup.Item>

                    { type.info && type.info.map((i, idx) => (
                        <ListGroup.Item
                            key={ idx }
                            style={ {
                                backgroundColor: (idx % 2 === 0) ? "lightgray" : "darkgray",
                                fontSize: 10,
                                margin: 0,
                                padding: 0,
                                textAlign: "center"
                            } }
                        >
                            <p>{ i.desc }</p>
                        </ListGroup.Item>))
                    }

                </ListGroup>

            </Card.Body>
            <Card.Footer className="d-flex justify-content-between"
            >
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={ () => { } }
                >
                    Edit
                </Button>
                <Button variant="danger"
                    size="sm"
                    onClick={ () => removeSkladPosition(id) }
                >
                    Удалить
                </Button>
            </Card.Footer>
        </Card>
    );
})

export default SkladCard;

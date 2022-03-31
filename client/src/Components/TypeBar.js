import { observer } from "mobx-react-lite"
import React from 'react'
import { useContext } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Context } from "..";

const TypeBar = observer(() => {
    const { ogo } = useContext(Context);

    return (
        <Container
            className="mt-4"
        >
            <ListGroup>
                {ogo.types.map(item =>
                    <ListGroup.Item
                        className="mt-2"
                        style={{ cursor: "pointer" }}
                        key={item.id}
                        active={item.id === ogo.selectedType.id}
                        onClick={() => ogo.setSelectedType(item)}
                    >
                        {item.type} - {item.price} руб.
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    )
})

export default TypeBar
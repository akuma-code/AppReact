import { observer } from "mobx-react-lite"
import React, { useEffect } from 'react'
import { useContext } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Context } from "..";
import { fetchTypes } from "../http/typesAPI";

const TypeBar = observer(() => {
    const { ogo } = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => ogo.setTypes(data))

    }, []);
    return (
        <Container
            className="my-4"
        >
            <ListGroup style={ { textAlign: "center" } }>
                <ListGroup.displayName>
                    <h4>Типы изделий</h4>
                </ListGroup.displayName>
                { ogo.types.map(item =>
                    <ListGroupItem
                        className="mt-2"
                        style={ { cursor: "pointer", textAlign: "center" } }
                        key={ item.id }
                        active={ item.id === ogo.selectedType.id }
                        onClick={ () => ogo.setSelectedType(item) }
                    >
                        { item.name }
                    </ListGroupItem>
                ) }
            </ListGroup>
            { ogo.types ? <Button
                className="mt-2 btn-secondary"
                size={ "sm" }
                style={ { cursor: "pointer", textAlign: "center" } }
                onClick={ () => ogo.setSelectedType({}) }>
                убрать сортировку
            </Button>
                :
                "" }
        </Container>
    )
})

export default TypeBar
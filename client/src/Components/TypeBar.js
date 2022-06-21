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

                { ogo.types.map(oktype =>
                    <ListGroup.Item
                        className="mt-2"
                        style={ { cursor: "pointer", textAlign: "center" } }
                        key={ oktype.id }
                        active={ oktype.id === ogo.sortType.id }
                        onClick={ () => ogo.setSortType(oktype) }
                    >
                        { oktype.name }
                    </ListGroup.Item>
                ) }
            </ListGroup>
            <Button
                className="mt-2 btn-secondary w-100"
                size={ "sm" }
                style={ { cursor: "pointer", textAlign: "center" } }
                onClick={ () => ogo.setSortType({}) }>
                убрать сортировку
            </Button>

        </Container>
    )
})

export default TypeBar
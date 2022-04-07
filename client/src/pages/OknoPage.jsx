import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Context } from '../index'
import { fetchTypes, fetchOneType } from '../http/typesAPI'
import { observer } from 'mobx-react-lite'
import { useParams } from "react-router-dom"
import { fetchOnePosition, removeShopPosition } from "../http/shopAPI"


const OknoPage = observer(() => {
    const { ogo } = useContext(Context)
    const [item, setItem] = useState({ type: {} })
    const [selType, setSelType] = useState({ info: [] })

    const { id } = useParams()
    const removeItem = (id) => {
        removeShopPosition(id)
    }
    useEffect(() => {
        fetchOnePosition(id).then(data => {
            data && setItem(data)
        })

        fetchOneType(id).then(type => {
            if (!type) setSelType({ info: [] })
            setSelType(type)
        })
    }, [])
    const imgSrc = item.type ? `${process.env.REACT_APP_API_URL}/${item.type.img}` : ""
    return (
        <Container
            className="d-flex flex-column mt-2"
        >
            <Button
                variant={ "danger" }
                onClick={ () => removeItem(id) }
            >
                Удалить позицию
            </Button>
            <Col md={ 4 }>
                { imgSrc && <Image width={ 400 } src={ imgSrc } alt="NO IMAGE" className="ml-0 mt-2" /> }

            </Col>
            <Row
                className="d-flex justify-content-between mt-1 mx-1 w-700"
            >
                <Col md={ 5 } className="border border-primary">
                    <div className="d-flex flex-row  justify-content-between border mt-3">
                        <h2 className="border">{ item.type && item.type.name }</h2>
                        <h2 className="border">{ item.price } руб.</h2>
                    </div>
                </Col>
                <Col md={ 7 } className="border">
                    <div className="border border-dark p-1">
                        <div className="border border-warning"><h4>Осталось на складе: ===</h4> </div>
                        <div className="border border-warning"><h4>В производстве: ===</h4></div>
                    </div>
                </Col>
            </Row>

            <Card className="d-flex justify-content-around align-items-center"
            >
                <h3>Описание</h3>
                { selType && selType.info.map((info, index) =>
                    <Row key={ info.id } style={ {
                        backgroundColor: (index % 2 === 0) ? "lightgray" : "darkgray",
                        width: "90%"
                    } }
                        className="ml-1">
                        { info.title }: { info.desc }
                    </Row>
                ) }

            </Card>

        </Container>
    )
})



export default OknoPage
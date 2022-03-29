import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Context } from '../index'
import { fetchTypes, fetchOneType } from '../http/typesAPI'
import { observer } from 'mobx-react-lite'
import { useParams } from "react-router-dom"


const OknoPage = observer(() => {

    const [item, setItem] = useState({ info: [] })

    const { id } = useParams()

    useEffect(() => {
        fetchOneType(id).then(data => setItem(data))
    }, [])


    return (
        <Container
            className="d-flex flex-column mt-2"
        >
            <Col md={4}>
                <Image width={400} src={process.env.REACT_APP_API_URL + '/' + item.img} className="ml-0 mt-2" />
            </Col>
            <Row
                className="d-flex justify-content-between mt-1 mx-1 w-700"
            >
                <Col md={5} className="border border-primary">
                    <div className="d-flex flex-row  justify-content-between border mt-3">
                        <h2 className="border">{item.type}</h2>
                        <h2 className="border">{item.price} руб.</h2>
                    </div>
                </Col>
                <Col md={7} className="border">
                    <div className="border border-dark p-1">
                        <div className="border border-warning"><h4>Осталось на складе: ===</h4> </div>
                        <div className="border border-warning"><h4>В производстве: ===</h4></div>
                    </div>
                </Col>
            </Row>
            <Card className="d-flex justify-content-around align-items-center"
            >
                <h3>Описание</h3>
                {item.info.map((info, index) =>
                    <Row key={info.id} style={{
                        backgroundColor: (index % 2 === 0) ? "lightgray" : "darkgray",
                        width: "90%"
                    }}
                        className="ml-1">
                        {info.title}: {info.desc}
                    </Row>
                )}
            </Card>
        </Container>
    )
})



export default OknoPage
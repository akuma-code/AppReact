import React, { useState } from 'react'
import { Button, Card, Col, Container, FormControl, Row, Spinner } from "react-bootstrap"
import NewOffer from "../Components/modals/NewOffer"

const test = [
    {
        "id": 29,
        "quant": 10,
        "typeId": 10,
        "type": {
            "id": 10,
            "name": "ОК-8",
            "img": "5d4665a0-7cf3-4ddd-a3c4-b4886f30c006.jpg",
            "info": [
                {
                    "id": 77,
                    "desc": "Ст\\п: 36 мм",
                    "typeId": 10
                },
                {
                    "id": 76,
                    "desc": "Века Пролайн 70мм",
                    "typeId": 10
                },
                {
                    "id": 83,
                    "desc": "Ст\\п: 36мм",
                    "typeId": 10
                }
            ]
        },
        "shop": {
            "id": 38,
            "price": 9800,
            "title": "ОКНО 8",
            "skladId": 29
        },
        "prods": []
    },
    {
        "id": 34,
        "quant": 6,
        "typeId": 13,
        "type": {
            "id": 13,
            "name": "ОК-2",
            "img": "647bfc06-190c-4961-a73b-12d969b52f5d.jpg",
            "info": [
                {
                    "id": 82,
                    "desc": "Минимальные габариты",
                    "typeId": 13
                },
                {
                    "id": 81,
                    "desc": "ст\\п: 24 мм",
                    "typeId": 13
                },
                {
                    "id": 80,
                    "desc": "ВХС 60мм",
                    "typeId": 13
                }
            ]
        },
        "shop": {
            "id": 35,
            "price": 4500,
            "title": "Proline Форточка",
            "skladId": 34
        },
        "prods": [
            {
                "id": 101,
                "number": 4,
                "dateReady": "2022-08-12",
                "isReady": false,
                "prodQuery": {
                    "id": 99,
                    "prodId": 101,
                    "skladId": 34
                }
            }
        ]
    }
]

export const OffersPage = () => {
    const [showNO, setShowNO] = useState(false)
    const [saved, setSaved] = useState([])
    const onConfirm = (newitem) => {

        setSaved(prev => [...prev, newitem])
    }
    const onHide = () => setShowNO(false)
    return (
        <Container fluid
            className="mt-1">
            <Row>
                <Col md={ 1 }>
                    <Button onClick={ () => setShowNO(prev => !prev) }>
                        Создать заявку
                    </Button>
                </Col>
                <Col md={ 4 } >
                    { saved && saved.map(i => (
                        <ul key={ Math.random() } className="border p2">
                            { Object.entries(i.client).map(([k, v]) =>
                                <li key={ Math.random() }>{ k } : { v }</li>) }
                        </ul>

                    )) }
                </Col>
            </Row>
            <NewOffer show={ showNO } onHide={ onHide } onConfirm={ onConfirm } />
        </Container>

    )
}

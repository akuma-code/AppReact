import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Col, Image } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { OKNO_ROUTE } from "../utils/consts"
import Imgtype from "./UI/ImgType.jsx"


const OkItem = observer(({ okitem }) => {
    //! {okitem}={id, title, price, type}
    const history = useHistory()
    const { id, title, price, type } = okitem
    return (
        <Col className="mt-4"
            onClick={() => history.push(OKNO_ROUTE + '/' + id)}
        >
            <Card
                style={{ width: 200, cursor: "pointer", textAlign: "center" }}
                border={"warning"}
                className="d-flex  m-1"
            >
                <Card.Header>
                    <h4>{price}</h4>
                </Card.Header>
                <Card.Body>
                    <Imgtype imgName={type && type.img} />
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center text-uppercase" >
                    <h4 >{title}</h4>
                </Card.Footer>
            </Card>
        </Col>
    )
})

export default OkItem
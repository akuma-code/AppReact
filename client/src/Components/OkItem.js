import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Col, Image } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { OKNO_ROUTE } from "../utils/consts"
import Imgtype from "./UI/ImgType"


const OkItem = observer(({ okitem }) => {
    //! {okitem}={id, title, price, type}
    const history = useHistory()
    const { id, title, price, type } = okitem
    return (
        <Col className="mt-4"
            onClick={ () => history.push(OKNO_ROUTE + '/' + id) }
        >
            <Card
                style={ { width: 200, cursor: "pointer", textAlign: "center" } }
                border={ "light" }
                className="d-flex  ml-1"
            >
                <Imgtype
                    imgName={ type && type.img } />
                <div className="d-flex justify-content-center text-uppercase" >
                    <div style={ { fontSize: "1.4em" } }>{ title }</div>

                </div>
            </Card>
        </Col>
    )
})

export default OkItem
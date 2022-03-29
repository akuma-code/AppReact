import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Col, Image } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { OKNO_ROUTE } from "../utils/consts"

const OkItem = observer(({ okitem }) => {
    const history = useHistory()

    return (
        <Col className="mt-4"
            onClick={ () => history.push(OKNO_ROUTE + '/' + okitem.id) }

        >
            <Card
                style={ { width: 200, cursor: "pointer", textAlign: "center" } }
                border={ "light" }
                className="d-flex  ml-1"
            >
                <Image fluid height={ 200 } src={ process.env.REACT_APP_API_URL + '/' + okitem.img } />
                <div className="d-flex justify-content-between" >
                    <div>{ okitem.type }</div>
                    <div>Price: { okitem.price } rub</div>
                </div>
            </Card>
        </Col>
    )
})

export default OkItem
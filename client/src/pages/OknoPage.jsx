import React from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'



const OknoPage = () => {
    const okitem = { id: 1, type: "OK1", price: 5100, img: "https://avatars.mds.yandex.net/i?id=2322bdf7a353af954cbaf003d2856977-5905964-images-thumbs&n=13&exp=1" }
    const desc = [
        { id: 1, title: "профиль", desc: "WHS" },
        { id: 2, title: "стеклопакет", desc: "24мм" },
        { id: 3, title: "размеры", desc: "795х465 мм" },
    ]
    return (
        <Container
            className="d-flex flex-column mt-2"
        >
            <Col md={ 4 }>
                <Image width={ 600 } src={ okitem.img } className="ml-0 mt-2" />
            </Col>
            <Row
                className="d-flex justify-content-between mt-1 mx-1 w-700"
            >
                <Col md={ 5 } className="border border-primary">
                    <div className="d-flex flex-row  justify-content-between border mt-3">
                        <h2 className="border">{ okitem.type }</h2>
                        <h2 className="border">{ okitem.price } руб.</h2>
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
                { desc.map((info, index) =>
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
}
<span class="">Hello World</span>
export default OknoPage
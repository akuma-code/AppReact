import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

const EditTypeForm = observer(({ type }) => {
    const [showName, setShowName] = useState(false)
    const [showInfo, setShowInfo] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [info, setInfo] = useState([{ desc: '', number: Date.now() }])

    const addInfo = () => {
        setInfo([...info, { desc: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))

    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }



    return (
        <Form className="d-flex flex-column justify-content-between">
            {type.info.length !== 0 && <Button className="bg-primary mb-2 w-25" onClick={() => setShowInfo(!showInfo)}>Edit Info</Button>}
            <Form.Group as={Row} className="mb-2 " controlId="name">
                <Col sm={2}>
                    <Form.Label as={Button} className="w-100"
                        onClick={() => setShowName(!showName)}
                    >
                        {!showName ? "Edit Name" : "Save"}
                    </Form.Label>
                </Col>
                <Col sm={{ offset: 0, span: 10 }}>
                    {showName &&
                        <Form.Control type="text" placeholder={type.name} value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="img">
                <Col sm="2">
                    <Form.Label as={Button} className="w-100"
                        onClick={() => setShowImg(!showImg)}
                    >
                        {!showImg ? "Edit Image" : "Save"}
                    </Form.Label>
                </Col>
                <Col sm={{ offset: 0 }}>
                    {showImg &&
                        <Form.Control type="file" value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    }
                </Col>
            </Form.Group>


            {showInfo && type?.info.map((i, idx) =>
                <InputGroup as={Row} className="mb-3" key={idx}>
                    <Col>
                        <Form.Control type="text" value={i.desc} onChange={(e) => changeInfo('desc', e.target.value, i.id)} />
                    </Col>
                    <Col>
                        <Form.Label as={Button} className="w-100"

                        >
                            Save
                        </Form.Label>
                    </Col>
                </InputGroup>
            )}

        </Form>
    );
})

export default EditTypeForm;

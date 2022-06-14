import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { isEqualString } from '../../../utils/Compare';

const btnCls = (isCh) => {
    if (isCh) return `bg-secondary mb-2 w-100`
    else return `bg-alert mb-2 w-100`
}

const EditTypeForm = ({ type }) => {
    const [showName, setShowName] = useState(false)
    const [showInfo, setShowInfo] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [info, setInfo] = useState([{ desc: '', number: '', typeId: type.id }])
    const [isChanged, setIsChanged] = useState(false)


    useLayoutEffect(() => {
        setIsChanged(false)
        setImg(type.img)
        setName(type.name)
        setInfo(type.info)
        return () => setShowInfo(false)
    }, [type.id])

    const saveForm = (typeId, name, img, info) => {
        const infos = JSON.parse(JSON.stringify(info))
        console.log({ typeId, name, img, info: infos });



        // const infos = info.map(i => i.desc)
        // const infos = info.map(i => i.typeId === typeId ? i.desc : "none")
    }
    const getInfo = (ntype) => {
        // setInfo([])
        ntype.info.map(inf => inf.typeId === type.id ? setInfo([...info, inf]) : setInfo([]))
    }

    const openForm = () => {
        // () => getInfo(type)
        saveForm(type.id, name, img, info)
        if (!isChanged) return setShowInfo(!showInfo)

        setShowInfo(!showInfo)
    }
    const addInfo = () => {
        setInfo([...info, { desc: '', number: '' }])
    }
    const removeInfo = (typeId) => {
        setInfo(info.filter(i => i.typeId !== type.id))
    }



    const changeInfo = (key, value, id) => {
        console.log("changed: ", key, value);
        setIsChanged(true)
        setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i))

    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }



    return (
        <Form className="d-flex flex-column justify-content-between">

            <Form.Group as={Row} className="mb-2 mt-2" controlId="name">
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

            {type.info.length !== 0 && <Button
                className=" mb-2 w-100"
                onClick={() => openForm()}
                variant={!isChanged ? "secondary" : "info"}
            >Edit Info
            </Button>}

            {showInfo && info.map((i, idx) =>
                <InputGroup as={Row} className="mb-3 mt-2" key={idx}>
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
}

export default EditTypeForm;

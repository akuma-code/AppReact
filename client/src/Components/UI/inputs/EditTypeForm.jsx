import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { isEqualString } from '../../../utils/Compare';
import { editType } from "../../../http/typesAPI";
import { useConsole } from "../../../hooks/useConsole";





const EditTypeForm = ({ type }) => {
    const [showName, setShowName] = useState(false)
    const [showInfo, setShowInfo] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [imgNew, setImgNew] = useState({})
    const [info, setInfo] = useState([{ desc: '', number: '', typeId: type.id }])
    const [isChanged, setIsChanged] = useState(false)


    useLayoutEffect(() => {
        setIsChanged(false)
        setImg(type.img)
        setName(type.name)
        setInfo(type.info)
        return () => setShowForm(false)
    }, [type.id])

    const saveForm = (typeId, name, img, info) => {
        const form = new FormData();
        form.append("typeId", typeId)
        form.append("name", name)
        form.append("imgSrc", img)
        form.append("img", imgNew)
        form.append("info", JSON.stringify(info))

        // const infos = JSON.parse(JSON.stringify(info))
        // console.log({ typeId, name, img, info: infos });
        return editType(form, typeId)

    }

    const changeName = (name) => {
        setIsChanged(true)
        setName(name)
    }

    const updateType = () => {
        saveForm(type.id, name, img, info)

    }

    const openForm = () => {

        setShowForm(!showForm)
        // setShowName(!showName)
        // setShowImg(!showImg)
        // setShowInfo(!showInfo)
    }




    const addInfo = () => {
        setInfo([...info, { desc: '', id: '', typeId: type.id }])
        setIsChanged(true)
    }
    const removeInfo = (id) => {
        setIsChanged(true)
        setInfo(info.filter(i => i.id !== id))
    }



    const changeInfo = (key, value, id) => {
        setIsChanged(true)
        setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i))

    }

    const selectFile = e => {
        setIsChanged(true)
        setImgNew(e.target.files[0])
    }



    return (
        <Form className="d-flex flex-column justify-content-between">
            <Button
                className=" mb-2 w-100"
                onClick={() => openForm()}
                variant={"secondary"}
            >
                Редактировать
            </Button>

            {showForm &&
                <Form.Group as={Row} className="mb-2 mt-2" controlId="name">
                    <Col sm={{ offset: 0, span: 4 }}>
                        <Form.Control type="text" placeholder={type.name} value={name}
                            onChange={(e) => changeName(e.target.value)}
                        />
                    </Col>
                    <Col sm={4}>
                        <Form.Label className="w-100"
                        >Изменить имя
                        </Form.Label>
                    </Col>

                </Form.Group>
            }
            {showForm &&
                <Form.Group as={Row} className="mb-3" controlId="img">
                    <Col sm={{ offset: 0 }}>

                        <Form.Control type="file"
                            onChange={(e) => selectFile(e)}
                        />

                    </Col>
                    <Col sm="2">
                        <Form.Label className="w-100"
                        >Изменить картинку
                        </Form.Label>
                    </Col>
                </Form.Group>

            }
            {
                isChanged && <Button
                    className='mb-2'
                    variant={"info"}
                    onClick={() => updateType()}>UPDATE</Button>
            }

            {showForm && <Button
                onClick={() => addInfo()}
            >
                ADD INFO
            </Button>
            }
            {showForm && info.map((i, idx) =>
                <InputGroup as={Row} className="mb-3 mt-2" key={idx}>
                    <Col>
                        <Form.Control type="text" value={i.desc} onChange={(e) => changeInfo('desc', e.target.value, i.id)} />
                    </Col>
                    {<Col>
                        <Form.Label as={Button} className="w-100"
                            onClick={() => removeInfo(i.id)}
                        >
                            DEL
                        </Form.Label>
                    </Col>}
                </InputGroup>
            )}

        </Form>
    );
}

export default EditTypeForm;

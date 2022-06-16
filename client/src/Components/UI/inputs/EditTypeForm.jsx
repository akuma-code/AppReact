import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { isEqualString } from '../../../utils/Compare';
import { editType } from "../../../http/typesAPI";
import { useConsole } from "../../../hooks/useConsole";
import { Context } from "../../..";





const EditTypeForm = observer(({ type }) => {

    const [showForm, setShowForm] = useState(true);
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [imgNew, setImgNew] = useState({})
    const [info, setInfo] = useState([{ desc: '', number: '', typeId: type.id }])
    const [savedInfo, setSavedInfo] = useState([{ desc: '', number: '', typeId: type.id }])
    const [isChanged, setIsChanged] = useState(false)
    const { ogo } = useContext(Context)

    useLayoutEffect(() => {
        setIsChanged(false)
        setImg(type.img)
        setName(type.name)
        setInfo(type.info)
        setSavedInfo(type.info)
        return () => setShowForm(false)
    }, [type.id, type.info])

    const checkId = (id) => { info.map(i => i.id).includes(id) }


    const saveForm = async (typeId, name, img, info) => {
        const form = new FormData();
        form.append("typeId", typeId)
        form.append("name", name)
        form.append("imgSrc", img)
        form.append("img", imgNew)
        form.append("info", JSON.stringify(info))

        editType(form, typeId).then(data => ogo.setSelectedType(type))
    }

    const getId = (infos = []) => {
        if (infos.length == 0) return 1
        const maxID = Math.max(...infos.map(i => i.id))
        return maxID + 1
    }

    const changeName = (name) => {
        setIsChanged(true)
        setName(name)
    }

    const updateType = () => {
        saveForm(type.id, name, img, savedInfo)
        // .then(data => setInfo(savedInfo.filter(i => !i.del)))
        ogo.setSelectedType(type)
    }



    const addInfo = () => {
        const iid = getId(info)
        setInfo([...info, { desc: '', id: iid, typeId: type.id, added: true }])
        setSavedInfo([...info, { desc: '', id: iid, typeId: type.id, added: true }])
        setIsChanged(true)
    }
    const removeInfo = (infoItem) => {
        setIsChanged(true)
        setSavedInfo(savedInfo.map(i => i.id === infoItem.id ? { ...i, del: true, typeId: "" } : i))
        // setInfo([...info, { desc: infoItem.desc, typeId: '', id: infoItem.id }])
        setInfo(info.filter(i => i.id !== infoItem.id))
        // setInfo(info.filter(i => !i.del))
    }



    const changeInfo = (key, value, id) => {
        setIsChanged(true)
        setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i))
        setSavedInfo(savedInfo.map(i => i.id === id ? { ...i, [key]: value } : i))

    }

    const selectFile = e => {
        setIsChanged(true)
        setImgNew(e.target.files[0])
    }



    return (
        <Form className="d-flex flex-column justify-content-between">
            {/* <Button
                className=" mb-2 w-100"
                onClick={ () => setShowForm(!showForm) }
                variant={ "secondary" }
            >
                Редактировать
            </Button> */}
            {
                <Button
                    className='mb-2'
                    variant={ isChanged ? "danger" : "secondary" }
                    disabled={ isChanged ? false : true }
                    style={ { visibility: `${isChanged ? "visible" : "hidden"}` } }

                    onClick={ () => updateType() }>Сохранить изменения</Button>
            }
            { showForm &&
                <Form.Group as={ Row } className="mb-2 mt-2" controlId="name">
                    <Col sm={ { offset: 0, span: 4 } }>
                        <Form.Control type="text" placeholder={ type.name } value={ name }
                            onChange={ (e) => changeName(e.target.value) }
                        />
                    </Col>
                    <Col sm={ 4 }>
                        <Form.Label className="w-100"
                        >Изменить имя
                        </Form.Label>
                    </Col>

                </Form.Group>
            }
            {
                showForm &&
                <Form.Group as={ Row } className="mb-3" controlId="img">
                    <Col sm={ { offset: 0 } }>

                        <Form.Control type="file"
                            onChange={ (e) => selectFile(e) }
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
                showForm && info.map((i, idx) =>
                    <InputGroup as={ Row } className="mb-3 mt-2" key={ idx }>
                        <Col>
                            <Form.Control type="text" value={ i.desc } onChange={ (e) => changeInfo('desc', e.target.value, i.id) } />
                        </Col>
                        { <Col>
                            <Form.Label as={ Button } className="w-100"
                                onClick={ () => removeInfo(i) }
                                variant={ "outline-danger" }
                            >
                                DEL
                            </Form.Label>
                        </Col> }
                    </InputGroup>
                )
            }
            {
                showForm && <Button
                    onClick={ () => addInfo() }
                >
                    ADD INFO
                </Button>
            }
        </Form >
    );
})

export default EditTypeForm;

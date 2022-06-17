import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { isEqualString } from '../../../utils/Compare';
import { editType, fetchTypes } from "../../../http/typesAPI";
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
    const [typeId, setTypeId] = useState("")
    const { ogo } = useContext(Context)




    const saveForm = async (typeId, name, img, info) => {
        if (!typeId) return console.log("NO TYPE ID");
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
        // ogo.setSelectedType(type)
        setIsChanged(false)
        // .then(data => setInfo(savedInfo.filter(i => !i.del)))
    }



    const addInfo = () => {
        const iid = getId(info)
        setInfo([...info, { desc: '', id: iid, typeId: type.id, added: true }])
        setSavedInfo([...info, { desc: '', id: iid, typeId: type.id, added: true }])
        setIsChanged(true)
    }
    const removeInfo = (infoItem) => {
        setSavedInfo(savedInfo.map(i => i.id === infoItem.id ? { ...i, del: true, typeId: "" } : i))
        setInfo(info.filter(i => i.id !== infoItem.id))
        setIsChanged(true)
        // setInfo([...info, { desc: infoItem.desc, typeId: '', id: infoItem.id }])
        // setInfo(info.filter(i => !i.del))
    }



    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i))
        setSavedInfo(savedInfo.map(i => i.id === id ? { ...i, [key]: value } : i))
        setIsChanged(true)

    }

    const selectFile = e => {
        setImgNew(e.target.files[0])
        setIsChanged(true)
    }



    useLayoutEffect(() => {
        setIsChanged(false)
        setImg(type.img)
        setName(type.name)
        setInfo(type.info)
        setSavedInfo(type.info)

        // return () => setShowForm(false)
    }, [type.id, type.info])


    return (
        <Form className="d-flex flex-column justify-content-between">

            {showForm && <Button
                className='mb-2'
                variant={isChanged ? "danger" : "secondary"}
                disabled={isChanged ? false : true}
                // style={ { visibility: `${isChanged ? "visible" : "hidden"}` } }
                active
                size='lg'
                onClick={() => updateType()}>
                {isChanged ? "Сохранить изменения" : "Параметры типа"}

            </Button>
            }
            {showForm && <Form.Group as={Row} className="mb-2 mt-2" controlId="name">
                <InputGroup>

                    <InputGroup.Text
                    >Изменить имя
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder={type.name} value={name}
                        onChange={(e) => changeName(e.target.value)}
                    />

                </InputGroup>
            </Form.Group>
            }
            {
                showForm && <Form.Group as={Row} className="mb-3" controlId="img">
                    <Col>


                        <Form.Control type="file"
                            onChange={(e) => selectFile(e)}
                            placeholder={"Изменить картинку"}

                        />
                        <Form.Label column className='w-100 text-center bd-secondary mt-1'>
                            Изменить картинку
                        </Form.Label>
                        {/* </Col> */}
                        {/* <Col sm="2"> */}


                    </Col>
                </Form.Group>

            }

            {
                showForm && info?.map((i, idx) =>
                    <InputGroup className="mb-3 mt-2" key={idx}>

                        <Form.Control type="text" value={i.desc} onChange={(e) => changeInfo('desc', e.target.value, i.id)} />

                        <InputGroup.Text as={Button}
                            onClick={() => removeInfo(i)}
                            variant={"outline-danger"}
                        >
                            Удалить
                        </InputGroup.Text>

                    </InputGroup>
                )
            }
            {
                showForm && <Button
                    onClick={() => addInfo()}
                >
                    Добавить характеристику
                </Button>
            }
        </Form>
    );
})

export default EditTypeForm;

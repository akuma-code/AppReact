import React from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
const CreateType = ({ show, onHide }) => {
    return (
        <Modal
            show={ show }
            onHide={ onHide }
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый тип окна
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="название типа"
                    />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ onHide }>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateType
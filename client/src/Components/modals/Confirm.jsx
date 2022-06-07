import React, { useContext } from 'react';
import { Confirm } from "react-confirm-bootstrap";
import { Context } from "../..";
import { removeSkladPosition } from "../../http/SkladAPI";


const ConfirmDelete = () => {

    const { sklad } = useContext(Context);
    const deleteItem = (id) => removeSkladPosition(id).then(data => sklad.setSelectedItem(null))
    const onComfirmAction = () => deleteItem(sklad.selectedItem.id)
    return (
        <Confirm
            onConfirm={ () => onComfirmAction() }
            body="Подтвердите удаление"
            confirmText="Confirm delete"
            title="DELETE TITLE"
            buttonText="BUTTON TEXT"
            cancelText="CANCEL TEXT"
            showCancelButton={ true }
        >
            <button
                className="mt-3">ConfirmButton</button>
        </Confirm>
    );
}

export default ConfirmDelete;



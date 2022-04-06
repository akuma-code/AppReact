import React from 'react';
import { InputGroup } from 'react-bootstrap';

const Inputgrp = ({ types, clickHndl }) => {

    return (
        <InputGroup className="mb-3">
            <DropdownButton
                variant="outline-secondary"
                title="Тип окна"
                id="input-group-dropdown-1"
            >{types && types.map(type =>
                <Dropdown.Item key={type.id}
                    onClick={clickHndl}
                >{type.name}</Dropdown.Item>
            )}
                <Dropdown.Divider />

            </DropdownButton>
            <FormControl />
        </InputGroup>
    );
}

export default Inputgrp;

import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';

const SettingsBadge = ({ item, onHide, children }) => {

    return (
        <Badge
            className="d-flex flex-column justify-content-center"
            bg="dark"
            text="light"
            onClick={() => onHide(true)}
        >
            {children}
        </Badge>
    );
}

export default SettingsBadge;

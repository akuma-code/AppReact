import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';



const Tabletype = observer(({ dbobjects, header }) => {
    const mockType = {
        "id": 7,
        "type": "OKNO 6",
        "price": 16800,
        "img": "82fc8c5e-bbce-40e3-88d9-084468a425c3.jpg",
        "updatedAt": "2022-04-01T20:09:13.183Z",
        "createdAt": "2022-04-01T20:09:13.183Z",
        "shopId": null
    }
    // const getProps = (type) => Object.keys(type).map(key => key.toString())
    const [typekeys, setTypekeys] = useState([]);
    // const header = getHeader(dbobjects)



    return (
        <Table striped bordered hover size="sm" variant='dark'>
            <thead>
                <tr>
                    {/* {typekeys.map(type =>
                        <th key={type.id}>{type}</th>)} */}
                </tr>
            </thead>
            <tbody>

            </tbody>
        </Table>
    );
})

export default Tabletype;



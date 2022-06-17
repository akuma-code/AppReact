import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Card } from "react-bootstrap";
import { useConsole } from "../../../hooks/useConsole";
import { Context } from '../../..';

const ShopCard = ({ shopItem, type }) => {
    const { id, price, title, skladId } = shopItem;
    const { ogo, sklad } = useContext(Context)
    const [image, setImage] = useState(type?.img)


    const getData = (skladId) => {
        const sitem = sklad.skladItems.filter(s => s.id === skladId)
        const type = ogo.types.filter(t => t.id === sitem.typeId)
        const p = JSON.parse(JSON.stringify(sitem))
        setImage(p?.type?.img)
    }


    return (
        <Card className="mt-2 mx-1">
            <Card.Header
                onClick={() => getData(skladId)}
            >{title}
            </Card.Header>
            <Card.Body>
                <Card.Img src={`${process.env.REACT_APP_API_URL}/${type.img}`} />

            </Card.Body>
        </Card>
    );
}

export default ShopCard;


/* <Card.Body
               className='d-flex flex-column justify-content-between'
           >
               <Card.Title as="h5"
                   style={{ fontSize: 19 }}
               > {title}
                   <hr />
               </Card.Title>
               <p className='d-flex flex-column'
                   style={{ fontSize: 16 }}>
                   <span>Price: {price} руб.</span>
                   <span>Id: {id}</span>
                   <span>SkladId:{skladId}</span>
               </p>
           </Card.Body>
           <Card.Footer className="d-flex justify-content-between"
           >

           </Card.Footer> */
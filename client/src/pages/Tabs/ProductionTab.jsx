import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import BigTaskCard from '../../Components/UI/card/BigTaskCard';
import { FetchingCenter } from "../../hooks/useFetchingCenter";

const ProductionTab = () => {

    const [query, setQuery] = useState([])
    useLayoutEffect(() => {
        FetchingCenter.fetchAll('prod')
            .then(data => setQuery(data))

    }, [])

    return (
        <Card className="mx-2">
            {query && query.map(item =>
                <Card.Text as='li' key={item.id}
                    style={{ border: '2px solid black', margin: '5px 5px' }}>
                    TaskID: {item.id} | SkladID: {item?.sklads.map(s => s.id)} | Quantity: {item.quant} | DateReady: {item.dateReady} | {item.isReady ? "DONE" : "Not Ready!"}
                </Card.Text>
            )}

        </Card>

    );
}

export default ProductionTab;

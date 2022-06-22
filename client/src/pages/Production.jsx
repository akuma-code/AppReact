import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "..";
import { FetchingCenter } from "../hooks/useFetchingCenter";

const Production = observer(() => {

    const { pQuery } = useContext(Context);
    const [query, setQuery] = useState([])
    useEffect(() => {
        FetchingCenter.fetchAll('prod')
            .then(data => setQuery(data))

    }, [])

    return (
        <div className="mx-2">
            { query && query.map(item =>
                <li key={ item.id }>TaskID: { item.id } | SkladID: { item?.sklads.map(s => s.id) } | Quantity: { item.quant } | DateReady: { item.dateReady } | { item.isReady ? "DONE" : "Not Ready!" } | </li>
            ) }
        </div>
    );
})

export default Production;

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Card, Container, Form, Row } from 'react-bootstrap';
import { Context } from '../..';
import BigTaskCard from '../../Components/UI/card/BigTaskCard';
import QueryCard from '../../Components/UI/card/QueryCard';
import { useCombineProdQuery, useCombineSklad } from "../../hooks/useCombineData";
import { FetchingCenter } from "../../hooks/useFetchingCenter";
import { useSortedQuery } from "../../hooks/useSortedQuery";



const ProductionTab = () => {

    const { sklad, ogo } = useContext(Context)
    const [prodquery, setProdquery] = useState([])
    const [filter, setFilter] = useState({ sort: '' })
    const [skItems, setSkItems] = useState([])
    const [isFilterFinished, setIsFilterFinished] = useState(false);
    const [qItems, setQItems] = useState([]);
    const sortedQuery = useSortedQuery(prodquery, filter.sort)
    const filteredType = item => ogo.types.find(t => t.id === item.typeId)
    const sklads = () => useCombineSklad(prodquery, skItems)


    useLayoutEffect(() => {
        FetchingCenter.fetchAll('prod/query')
            .then(data => setProdquery(data))
        FetchingCenter.fetchAll('sklad')
            .then(data => setSkItems(data))


    }, [])

    // useEffect(() => {

    //     setProdquery(sklads());
    //     // setSkItems(sklad.skladItems.filter(i => i.prods !== null))
    // }, [filter])

    useLayoutEffect(() => {
        FetchingCenter.fetchAll('prod/query')
            .then(data => setProdquery(data))
        const items = sklads()
        setQItems(items)
    }, [isFilterFinished]);

    useEffect(() => {

    }, [])
    return (
        <Container>
            <Row md={ 3 } className="my-2">
                <Form className="d-flex flex-row gap-3 align-items-start">
                    <Form.Select
                        value={ filter.sort }
                        placeholder="Фильтровать по"
                        className=" mt-1"
                        onChange={ (e) => setFilter({ ...filter, sort: `${e.target.value}` }) }

                    >
                        <option disabled>Фильтровать по</option>
                        <option value={ "id" }>query ID</option>
                        <option value={ "dateReady" }>dateReady</option>
                        <option value={ "number" }>Quantity</option>
                        <option value={ "typeId" }>Type</option>
                    </Form.Select>

                    <Form.Check
                        type="switch"
                        label="Показывать завершенные"
                        value={ isFilterFinished }
                        id="custom-switch"
                        className="h-100"
                        onChange={ () => setIsFilterFinished(!isFilterFinished) } />


                </Form>
            </Row>
            <Row md={ 1 } className="w-100">
                { sortedQuery && sortedQuery.map(item =>

                    <QueryCard
                        queryItem={ item }
                        key={ item.id }
                    />
                ) }
            </Row>



        </Container>
    );
}

export default ProductionTab;


//  <Card className="my-1" key={item.id}
//                     >
//                         <Card.Text as='li'
//                             style={{ margin: '5px 5px' }}>
//                             TaskID: {item.id} | SkladID: {item?.sklads.map(s => s.id)} | Quantity: {item.number} | DateReady: {item.dateReady} | {item.isReady ? "DONE" : "Not Ready!"}
//                         </Card.Text>
//                     </Card>
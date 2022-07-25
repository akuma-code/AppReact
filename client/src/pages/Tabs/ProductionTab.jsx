import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Card, Container, Form, Row } from 'react-bootstrap';
import { Context } from '../..';
import BigTaskCard from '../../Components/UI/card/BigTaskCard';
import QueryCard from '../../Components/UI/card/QueryCard';
import { FetchingCenter } from "../../hooks/useFetchingCenter";
import { useSortedQuery } from "../../hooks/useSortedQuery";



const ProductionTab = () => {

    const { sklad, ogo } = useContext(Context)
    const [query, setQuery] = useState([])
    const [filter, setFilter] = useState({ sort: '' })
    const [skItems, setSkItems] = useState({})
    const [isFilterFinished, setIsFilterFinished] = useState(false);
    const sortedQuery = useSortedQuery(query, filter.sort)
    const filteredType = item => ogo.types.filter(t => t.id === item.sklads[0].typeId)[0]


    useLayoutEffect(() => {
        setSkItems(...sklad.skladItems.filter(i => i.prods !== null))
        FetchingCenter.fetchAll('prod')
            .then(data => setQuery(data))
    }, [])

    useEffect(() => {
        console.log("sort by ", filter.sort);
        setQuery(sortedQuery)
        setSkItems(sklad.skladItems.filter(i => i.prods !== null))
    }, [filter])

    useLayoutEffect(() => {
        FetchingCenter.fetchAll('prod')
            .then(data => setQuery(data.filter(q => q.isReady == isFilterFinished)))

    }, [isFilterFinished]);
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
                        typeInf={ filteredType(item) }
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
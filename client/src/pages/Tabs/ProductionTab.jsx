import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Card, Container, Form, Row } from 'react-bootstrap';
import BigTaskCard from '../../Components/UI/card/BigTaskCard';
import { FetchingCenter } from "../../hooks/useFetchingCenter";
import { useSortedQuery } from "../../hooks/useSortedQuery";



const ProductionTab = () => {

    const [query, setQuery] = useState([])
    const [filter, setFilter] = useState({ sort: '' })
    const sortedQuery = useSortedQuery(query, filter.sort)


    useLayoutEffect(() => {
        FetchingCenter.fetchAll('prod')
            .then(data => setQuery(data))

    }, [])
    useEffect(() => {
        console.log("sort by ", filter.sort);
        console.log(sortedQuery);
    }, [filter])
    return (
        <Container>
            <Row md={4} className="my-2">
                <Form>
                    <Form.Select
                        value={filter.sort}
                        placeholder="Фильтровать по"
                        onChange={(e) => setFilter({ ...filter, sort: `${e.target.value}` })}

                    >
                        <option disabled>Фильтровать по</option>
                        <option value={"id"}>id</option>
                        <option value={"dateReady"}>dateReady</option>
                    </Form.Select>
                </Form>
            </Row>
            <Row>
                {query && query.map(item =>
                    <Card className="my-1" key={item.id}
                    >
                        <Card.Text as='li'
                            style={{ margin: '5px 5px' }}>
                            TaskID: {item.id} | SkladID: {item?.sklads.map(s => s.id)} | Quantity: {item.number} | DateReady: {item.dateReady} | {item.isReady ? "DONE" : "Not Ready!"}
                        </Card.Text>
                    </Card>
                )}
            </Row>



        </Container>
    );
}

export default ProductionTab;

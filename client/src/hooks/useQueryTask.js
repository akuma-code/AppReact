
import { useEffect, useState } from "react"


const tasks = [
    {
        id: 1,
        price: 8100,
        title: "ОК4 1170х1000",
        skladId: 1,
        sklad: {
            id: 1,
            quant: 6,
            typeId: 2,
            type: {
                id: 2,
                name: "OK-4",
                img: "89e75e2f-f355-4d8c-8b47-eb6400f439ed.jpg",
                info: [
                    {
                        id: 3,
                        desc: "Популярное",
                        typeId: 2
                    },
                    {
                        id: 4,
                        desc: "ВХС",
                        typeId: 2
                    }
                ]
            },
        }
    },
    {
        id: 2,
        price: 8100,
        title: "ОК4 1170х1000",
        skladId: 2,
        sklad: {
            id: 2,
            quant: 6,
            typeId: 2,
            type: {
                id: 2,
                name: "OK-4",
                img: "89e75e2f-f355-4d8c-8b47-eb6400f439ed.jpg",
                info: [
                    {
                        id: 3,
                        desc: "Популярное",
                        typeId: 2
                    },
                    {
                        id: 4,
                        desc: "ВХС",
                        typeId: 2
                    }
                ]
            },
        }
    },
]

export const useQueryTask = (itemsQuery = [], date) => {
    // !Array.isArray(itemsQuery) ? itemsQuery = [itemsQuery] : itemsQuery
    const prodTask = (task, dateReady, amount) => task = { ...task, dateReady, amount }

    const selected = itemsQuery.map(item => {
        if (item.quant && item.typeId) {
            const {
                amount,
                id,
                quant,
                shop: { price, title },
                type: { name, img } } = item
            return prodTask({ skladId: id, price, title, name, img }, date)
        };
        if (item.price && item.title && item.skladId) {
            const { sklad: { type: { name, img }, quant, id: skladId }, price, title, amount } = item;
            return prodTask({ skladId, price, title, name, img }, date)
        }
    })
    console.log(selected);
    const wrapform = (ptask) => {
        const form = new FormData()
        const newform = Object.entries(ptask).map(([key, val]) => form.append(key, val))
        return newform
    }
    return selected.map(s => wrapform(s))
}

export const useTaskForm = (taskQuery = []) => {
    const [query, setQuery] = useState([]);

    useEffect(() => {
        console.log(query);

    }, [query]);
    const ADD = (task, date) => {
        setQuery([...query, { ...task, date }])
        if (task.skladId) console.log('shopItem');
        if (task.typeId) console.log('skladItem');
        console.log(task);
    }
    const REM = (task) => setQuery(query.filter(t => t.id !== task.id))
    return [ADD, REM]
}
// {
//     "id": 4,
//     "quant": 8,
//     "typeId": 4,
//     "type": {
//         "id": 4,
//         "name": "ОК-10",
//         "img": "6897179e-2db7-43c5-8e77-7a69315d34f0.jpg",
//         "info": []
//     },
//     "shop": {
//         "id": 4,
//         "price": 6000,
//         "title": "okno10",
//         "skladId": 4
//     },
//     "prods": []
// }
// {
//     id: 1,
//         price: 8100,
//             title: "ОК4 1170х1000",
//                 skladId: 1,
//                     sklad: {
//         id: 1,
//             quant: 6,
//                 typeId: 2,
//                     type: {
//             id: 2,
//                 name: "OK-4",
//                     img: "89e75e2f-f355-4d8c-8b47-eb6400f439ed.jpg",
//                         info: [
//                             {
//                                 id: 3,
//                                 desc: "Популярное",
//                                 typeId: 2
//                             },
//                             {
//                                 id: 4,
//                                 desc: "ВХС",
//                                 typeId: 2
//                             }
//                         ]
//         },
//     }
// }
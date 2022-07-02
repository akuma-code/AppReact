/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'

const tasks = [
    {
        id: 1,
        price: 8100,
        title: 'ОК4 1170х1000',
        skladId: 1,
        sklad: {
            id: 1,
            quant: 6,
            typeId: 2,
            type: {
                id: 2,
                name: 'OK-4',
                img: '89e75e2f-f355-4d8c-8b47-eb6400f439ed.jpg',
                info: [
                    {
                        id: 3,
                        desc: 'Популярное',
                        typeId: 2,
                    },
                    {
                        id: 4,
                        desc: 'ВХС',
                        typeId: 2,
                    },
                ],
            },
        },
    },
    {
        id: 2,
        price: 8100,
        title: 'ОК4 1170х1000',
        skladId: 2,
        sklad: {
            id: 2,
            quant: 6,
            typeId: 2,
            type: {
                id: 2,
                name: 'OK-4',
                img: '89e75e2f-f355-4d8c-8b47-eb6400f439ed.jpg',
                info: [
                    {
                        id: 3,
                        desc: 'Популярное',
                        typeId: 2,
                    },
                    {
                        id: 4,
                        desc: 'ВХС',
                        typeId: 2,
                    },
                ],
            },
        },
    },
    {
        id: 4,
        quant: 8,
        typeId: 4,
        type: {
            id: 4,
            name: 'ОК-10',
            img: '6897179e-2db7-43c5-8e77-7a69315d34f0.jpg',
            info: [],
        },
        shop: {
            id: 4,
            price: 6000,
            title: 'okno10',
            skladId: 4,
        },
        prods: [],
    },
]

const typeSwitcher = (item) => {
    let quant, dateReady, skladId
    let result = {}
    const isShop = (item) => (item.skladId && item.sklad ? true : false)
    const values = Object.entries(item).reduce((prev, [k, val]) => ({ ...prev, [k]: val ?? {} }), {})
    console.log(isShop(values))

    const { id, ...rest } = values
    if (!isShop(values)) {
        ;[quant] = rest
        skladId = id
        const skladProps = { skladId: skladId, quant: parseInt(quant) }
        return skladProps
    }
}

export const useTaskForm = (setState, constType) => {
    const [query, setQuery] = useState([])

    useEffect(() => {
        // setQuery(query.map(typeSwitcher))
        console.log(query)
    }, [])

    const makeForm = ({ skladId = '1', quant = '5', dateReady = '2000-01-01' }) => {
        const form = new FormData()
        form.append('dateReady', dateReady)
        form.append('skladId', skladId)
        form.append('quant', quant)
        form.append('isReady', `false`)
        return form
    }

    const ADD = (task, date) => {
        const data = typeSwitcher(task, constType)
        setQuery([...query, { ...data, date }])
    }
    const REM = (task) => setQuery(query.filter((t) => t.id !== task.id))

    const START = () => {
        setQuery(query.map((item) => makeForm(item)))
        setState(query)
    }

    return [ADD, REM, START]
}

export const useQueryTask = (itemsQuery = [], date) => {
    // !Array.isArray(itemsQuery) ? itemsQuery = [itemsQuery] : itemsQuery
    const prodTask = (task, dateReady, amount) => (task = { ...task, dateReady: dateReady, amount: amount })

    const selected = itemsQuery.map((item) => {
        if (item.quant && item.typeId) {
            const {
                amount,
                id,
                quant,
                shop: { price, title },
                type: { name, img },
            } = item
            return prodTask({ skladId: id, price, title, name, img }, date)
        }
        if (item.price && item.title && item.skladId) {
            const {
                sklad: {
                    type: { name, img },
                    quant,
                    id: skladId,
                },
                price,
                title,
                amount,
            } = item
            return prodTask({ skladId, price, title, name, img }, date)
        }
    })
    console.log(selected)
    const wrapform = (ptask) => {
        const form = new FormData()
        const newform = Object.entries(ptask).map(([key, val]) => form.append(key, val))
        return newform
    }
    return selected.map((s) => wrapform(s))
}

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

// switch (itemType) {
//     case ('sklad'): {
//         console.log('skladItem', values)
//         const { id: skladId, type: { img }, quant, } = values
//         // const { price = '', title = '' } = values.shop !== null ? values.shop : { price: 0, title: 'NONE' }
//         const { price } = values.shop || 0
//         const { title } = values.shop || ''
//         // if (values.shop) result = { ...result, price: values.shop.price, title: values.shop.title }
//         //  let { price = '', title = '' } = item.shop

//         // if (values.type!==null) result = { ...result, name: values.type.name, img: values.type.img }
//         console.log({ skladId, quant, name, img, price, title });
//         return { skladId, quant, name, img, price, title };
//     }
//     case ('shop'):
//         console.log('shopItem');
//         const { sklad: { type: { img }, id: skladId }, price, title } = values

//         break;

//     default:
//         console.log("TYPE ERROR at ", item)
// }

// return { img, quant, skladId, price, title }

const prods = [{
    "id": 94,
    "number": 4,
    "dateReady": "2022-07-22",
    "isReady": false,
    "sklads": [
        {
            "id": 30,
            "quant": 4,
            "typeId": 12,
            "prodQuery": {
                "id": 92,
                "prodId": 94,
                "skladId": 30
            }
        }
    ]
},
{
    "id": 96,
    "number": 2,
    "dateReady": "2022-08-03",
    "isReady": false,
    "sklads": [
        {
            "id": 29,
            "quant": 0,
            "typeId": 10,
            "prodQuery": {
                "id": 93,
                "prodId": 96,
                "skladId": 29
            }
        }
    ]
}]

export const useCombineProdQuery = (prodData = [], condition = null) => {
    try {
        const combined = prodData.map(p => ({
            ...p,
            typeId: p.sklads[0].typeId,
            skladId: p.sklads[0].id,
        }))
        if (condition) {
            const [key, value] = Object.entries(condition)
            const withCond = combined.filter(c => c[key] === value)

            return withCond
        }
        return combined
    } catch (error) {
        console.log(error)
    }


}

export const useCombineSklad = (query = [], skladData = []) => {
    const skMap = new Map();
    const qMap = new Map();
    const idMap = new Map();
    skladData.forEach(item => {
        const id = item.id
        // delete item.id
        idMap.set(id, item)
        return { type: item.type, shop: item.shop, rest: item.quant }
    })


    const sklads = skladData?.map(s => ({ skladId: s.id, type: s.type, shop: s.shop }))


    sklads.forEach(sklad => skMap.set(sklad.skladId, { type: sklad.type, shop: sklad.shop }))
    query.forEach(q => qMap.set(q.id, { skladId: q.skladId }))


    try {
        const ofe = Object.fromEntries(idMap);
        const combined = query.map(qu => {

            return {
                ...qu,
                queryId: qu.id,
                sklad: ofe[qu.skladId],
                type: ofe[qu.skladId].type,
                shop: ofe[qu.skladId].shop,
            }
        })


        console.log('skladCombined', combined)
        // combined.map((c) => delete c.id)
        return combined
    } catch (error) {
        console.log(error)
    }

    return sklads

}
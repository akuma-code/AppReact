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
    const skMap = new Map()
    const sklads = skladData?.map(s => ({ skladId: s.id, type: s.type, shop: s.shop }))
    sklads.map(sklad => skMap.set(sklad.skladId, { type: sklad.type, shop: sklad.shop }))
    console.log('skMap', Object.fromEntries(skMap))
    try {
        const combined = query.map(qu => ({
            ...qu,
            sklad: sklads.find(s => s.skladId === qu.skladId)
        }))


        console.log('skladCombined', combined)
        return combined.map(item => ({ ...item, type: item.sklad.type }))
    } catch (error) {
        console.log(error)
    }
    console.log(sklads);
    return sklads

}
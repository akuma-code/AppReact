const pdata = JSON.parse(
    JSON.stringify({
        "id": "50",
        "quant": "5",
        "typeId": "16",
        "type": {
            "id": 16,
            "name": "ОК-1",
            "img": "c537dbea-f200-420d-9eb6-5426f24b93e7.jpg",
            "info": []
        },

        "shop": {
            "id": 71,
            "price": 4500,
            "title": "ВХС Фрамуга",
            "skladId": 50
        },
        "prods": []
    })
);

export function sklad1(sobj) {

    const { id, quant, shop: { price = '', title, skladId }, type: { name, img } } = sobj

    const skData = { skladId, quant, typeId, shop: { shopId, price, title }, type: { tId, name, img } }

    console.log(skData);
}


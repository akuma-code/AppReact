export class IType {
    constructor () {
        this.id = Number
        this.img = String
        this.info = []
    }
}


export class ISklad {
    constructor () {
        this.id = typeof Number
        this.quant = Number
        this.typeId = Number
        this.type = IType
    }
}

export class IShop {
    constructor () {
        this.id = Number
        this.title = String
        this.price = Number
        this.skladId = Number
        this.sklad = [
            { ISklad }
        ]

    }
}


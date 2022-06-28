class ProductionTask {
    constructor (skladId, quant) {
        this._skladID = skladId
        this._quant = quant
    }

    get quant() {
        return this._quant
    }

    set quant(value) {
        return this._quant = Number(value)
    }
    get skladId() {
        return this._skladId
    }

    set skladId(value) {
        return this._skladId = value
    }
    get prodId() {
        return this._prodId
    }

    set prodId(value) {
        return this._prodId = value
    }

    getForm() {
        const form = new Map();
        form.set('skladId', this._skladId)
        form.set('quant', this._quant)

        return form
    }
}

class PTQuery {
    constructor (skladId, prodId, queryId) {
        this._skladId = skladId
        this._prodId = prodId
        this._queryId = queryId
    }

    get skladId() {
        return this._skladId
    }

    set skladId(value) {
        return this._skladId = value
    }
    get prodId() {
        return this._prodId
    }

    set prodId(value) {
        return this._prodId = value
    }
    get queryId() {
        return this._queryId
    }

    set queryId(value) {
        return this._queryId = value
    }
}

class QueryTask {
    constructor (tasks = [], dateReady = '', qtId = null) {
        this._dateReady = dateReady
        this._tasks = tasks
        this._qtId = qtId
    }

    get dateReady() {
        return this._dateReady
    }

    set dateReady(value) {
        return this._dateReady = value
    }
    get qtId() {
        return this._qtId
    }

    set qtId(value) {
        return this._qtId = value
    }
    get tasks() {
        return this._tasks
    }

    set tasks(value) {
        !Array.isArray(value) ? this._tasks = [value] : value
        return this._tasks
    }


}


const pt = new ProductionTask(2, 4)
const qpt = new PTQuery(2, 1, 1)
const qt = new QueryTask(qpt, '2022-07-02')

module.exports = { ProductionTask, PTQuery, QueryTask }
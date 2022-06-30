//@ts-check


class ProductionTask {
    constructor (skladId, quant) {
        this._skladID = skladId
        this._quant = quant
    }

    get quant() {
        return this._quant
    }

    set quant(value) {
        this._quant = Number(value)

    }
    get skladId() {
        return this._skladId
    }

    set skladId(value) {
        this._skladId = value
    }
    get prodId() {
        return this._prodId
    }

    set prodId(value) {
        this._prodId = value
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
        this._skladId = value
    }
    get prodId() {
        return this._prodId
    }

    set prodId(value) {
        this._prodId = value
    }
    get queryId() {
        return this._queryId
    }

    set queryId(value) {
        this._queryId = value
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
        this._dateReady = value
    }
    get qtId() {
        return this._qtId
    }

    set qtId(value) {
        this._qtId = value
    }
    get tasks() {
        return this._tasks
    }

    set tasks(value) {
        !Array.isArray(value) ? this._tasks = [value] : value
    }


}

class PTask {
    setTask(skladId, quant) {
        this._skladId = skladId
        this._quant = quant

    }

    getTask() {
        const task = { skid: this._skladId, q: this._quant }
        return task
    }
}



module.exports = { ProductionTask, PTQuery, QueryTask }
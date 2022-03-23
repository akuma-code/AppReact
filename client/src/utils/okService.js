class okItem {
    constructor (name = String, price = Number, config) {
        this.name = name;
        this.price = price;
        this.cfg = config;
    }
}


class okService {
    static getOk(name, price, conf) {
        const ok = new okItem(name, price, conf);
        // console.log('ok', ok)
        return ok
    }

    static addProps(ok = okItem, props) {
        const tmp = { ...ok.cfg, ...props }
        ok.cfg = tmp
        return ok
    }
}




export default okService
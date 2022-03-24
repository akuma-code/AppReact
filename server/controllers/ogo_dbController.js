const pool = require('./ogo_db')

class OgoDBController {
    async createItem(req, res) {
        const {
            title,
            count
        } = req.body;

        try {
            const newItem = await pool.query('INSERT INTO ogo_db (title, count) values ($1, $2) RETURNING *', [title, count])
            res.json(newItem.rows[0])
        } catch (e) {
            console.log(e);
        }
    }
    async getItems(req, res) {
        const items = await pool.query('SELECT * FROM ogo_db')
        res.json(items.rows)
    }
    async getOneItem(req, res) {
        const {
            id
        } = req.params
        const item = await pool.query('SELECT * from ogo_db where id = $1', [id]);
        console.log(item.rows[0]);
        res.json(item.rows[0])
    }
    async updateItem(req, res) {
        const {
            id,
            title,
            count
        } = req.body;
        const item = await pool.query('UPDATE ogo_db set  title = $1, count = $2 where id = $3 RETURNING *', [title, count, id])
        res.json(item.rows[0])
    }
    async updateCount(req, res) {
        const {
            id,
            count
        } = req.body;
        const item = await pool.query('UPDATE ogo_db set   count = $1 where id = $2 RETURNING *', [count, id])
        res.json(item.rows[0])
    }
    async deleteItem(req, res) {
        const {
            id
        } = req.params
        const item = await pool.query('DELETE  from ogo_db where id = $1', [id]);
        res.json(item.rows[0])
    }
}

module.exports = new OgoDBController()
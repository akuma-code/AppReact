require('dotenv').config()
require('dayjs/locale/ru')
const dayjs = require('dayjs')
dayjs.locale('ru')
// import 'dayjs/locale/de' // ES 2015 

// dayjs.locale('ru')
const express = require("express");
const path = require('path');
const sequelize = require('./db')
// const models = require('./models/models')
// const typeModels = require('./models/typeModels')
const prodModels = require('./models/ProdModels')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errHandler = require('./middleware/ErrorHandlingMW')

const PORT = process.env.PORT || 5000
const HOST = `http://${process.env.HOST_WORK}:${PORT}`
const App = express();

App.use(cors());
App.use(express.json());
App.use(express.static(path.resolve(__dirname + '/build')));
App.use(express.static(path.resolve(__dirname + '/static')));
App.use(fileUpload({}))
App.use('/api', router)


App.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


App.use(errHandler)




async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })

        console.clear()
        App.listen(PORT, () => {
            console.log("<<< SERVER STARTED on", HOST, ">>>");

        })
    } catch (e) {
        console.log(e);
    }

}

start()

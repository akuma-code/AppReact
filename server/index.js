require('dotenv').config()
const express = require("express");
const path = require('path');
const sequelize = require('./db')
// const models = require('./models/models')
const typeModels = require('./models/typeModels')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errHandler = require('./middleware/ErrorHandlingMW')

const App = express();
const PORT = process.env.PORT || 3000

App.use(express.json());
App.use(cors());
App.use(fileUpload({}))

App.use(express.static(path.resolve(__dirname + 'static')));
App.use(express.static(path.resolve(__dirname + 'DB')));

App.use('/api', router)


App.use(errHandler)

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        App.listen(PORT, () => {
            console.log("<<< SERVER STARTED on PORT:", PORT, ">>>");

        })
    } catch (e) {

    }

}

start()

require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnnection = require("./db");

const controllers = require("./controllers");

app.use("/character", controllers.characterController);

dbConnnection.authenticate()
    .then(() => dbConnnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });


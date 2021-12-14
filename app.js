require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

const controllers = require('./controllers')
const middleware = require("./middleware")


app.use(Express.json())
app.use(middleware.CORS)
app.use('/character', controllers.characterController);
app.use('/user', controllers.userController);


app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!')
})

dbConnection.authenticate()
    .then(() => dbConnection.sync())

    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });


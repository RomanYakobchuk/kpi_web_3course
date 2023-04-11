const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const {configs} = require("./config");
const {studentsRouter} = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());
app.use(morgan("common"));

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/ping', (req, res) => res.json({message: "Server work stably"}))

app.use('/api/v1/students', studentsRouter)

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    console.log(err)
    res
        ?.status(err?.status || 500)
        .json({
            error: err?.message || 'Unknown Error',
            code: err?.status || 500
        });
});

mongoose?.connect(configs.MONGO_URL).then(() => {
    console.log("|-------------------------------------------")
    console.log('| Connect: success')
    app.listen(configs.PORT, () => {
        console.log(`| Started on port http://localhost:${configs.PORT}`);
        console.log("|___________________________________________")
    });
}).catch(err => {
    console.log('connect: error')
})
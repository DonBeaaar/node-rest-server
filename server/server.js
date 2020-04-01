require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'))

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (error, res) => {
        if (error) throw (error);

        else console.log('Base de datos online');

    });
app.listen(process.env.PORT, () => {
    console.log(`Escuchando ${process.env.PORT} port`);

});
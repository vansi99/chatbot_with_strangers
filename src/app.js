const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const webhook = require('./routes/webhook');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/webhook', webhook);


app.listen(process.env.PORT || 1337, (err) =>{
    console.log("server is running");
});


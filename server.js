'use strict';


// call in all requirements for project
const PORT = process.env.PORT || 3000
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const app = express();
const ejs = require('ejs');



const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// set view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('./pages/index');
});







app.listen(PORT, () => console.log(`up on port ${PORT}`));


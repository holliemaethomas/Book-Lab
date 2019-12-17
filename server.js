'use strict';


// call in all requirements for project
require ('dotenv').config();
const express = require('express');
const pg = require('pg');

const app = express();

const PORT = process.env.PORT

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on
'use strict';


// call in all requirements for project
const PORT = process.env.PORT || 3099
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const app = express();
const superagent = require('superagent');

// const ejs = require('ejs');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

///// constructor
// function ObjectifyBook (title, author) {
//   this.title = title,
//   this.author = author
//   this.formatted_query = formatted_address,
//   this.search_query = search_query
// }

// set view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('./pages/index');
});

app.post('/searches', (req, res) => {

  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.author}`).then(data => {

    const books = data.body.items.map(book => ({name: book.volumeInfo.title}));

    console.log(books);

    res.render('./pages/searches');

    // res.render('book-results', {
    //   books: books
    // });
  });
});



app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));



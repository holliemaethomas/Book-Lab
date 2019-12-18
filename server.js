'use strict';


// call in all requirements for project
const PORT = process.env.PORT || 3000
require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
const books = [];


// function to handle errors
function errors(error, response) {
  console.error(error);
  response.render('error');
}
console.log(errors);

// set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

/////app.get for home page
app.get('/', (req, res) => {
  res.render('./pages/index');
});


/// constructor
function BookObject(book) {
  this.title = book.volumeInfo.title
  this.authors = book.volumeInfo.authors
  this.description = book.volumeInfo.description
  this.image = book.volumeinfo.imagelinks.thumbnail
}

/////route creation?
// credit for this functionality is from class demo
app.post('/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.searchType}+in${req.body.searchType}:${req.body.query}`).then(data => {
    books.push(data.body.items);
    console.log(books);

    const returns = books.map(book => {
      return new BookObject(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.description)
    })
    res.render('/show', { returns: returns });
  })
    .catch(errors)
});


app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));


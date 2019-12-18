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
  response.render('./views/pages/error');
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


/////route creation?
// credit for this functionality is from class demo
app.post('/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.searchType}+in${req.body.searchType}:${req.body.query}`).then(data => {
    console.log(data);
    for (let i = 0; i < 10; i++) {
      books.push(data.body.items[i])
    }

    console.log(books);
    const returns = books.map(book => {
      return new BookObject(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.description)
    })
    res.render('views/pages/show', { returns: returns });
  })
    .catch(errors)
});

function BookObject(books) {
  this.title = books.volumeInfo.title
  this.authors = books.volumeInfo.authors
  this.description = books.volumeInfo.description
  this.image = books.volumeinfo.imagelinks.thumbnail
}


app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));


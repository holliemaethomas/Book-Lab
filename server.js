'use strict';

// global const
const express = require('express');
const superagent = require('superagent');
const app = express();

// const books = [];

// app.'s
app.set('view engine', 'ejs');
app.use(express.static('styles'));

// function to handle errors
function errors(error, response) {
  console.error(error);
  response.render('./pages/error');
}
console.log(errors);

app.get('/', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${'star wars'}`)
    .then(book => {
      console.log(book);
      res.render('index', { books: book.body.items });
    });

});


/////route creation?
// credit for this functionality is from class demo


app.post('/show', (req, res) => {

  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.searchType}+in${req.body.searchType}:${req.body.query}`).then(data => {
    for (let i = 0; i < 10; i++) {
      books.push(data.body.items[i])
    }

    console.log(books);
    const returns = books.map(book => {
      return new BookObject(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.description)
    })
    res.render('./pages/show', { returns: returns });
  })

    .catch(err => {
      errors(err, res)
    });
});
// yosh helped me write the error function

function BookObject(books) {
  this.title = books.volumeInfo.title
  this.authors = books.volumeInfo.authors
  this.description = books.volumeInfo.description
  this.image = books.volumeinfo.imagelinks.thumbnail
}


app.post('/', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${'star trek'}`)
    .then(book => {
      // console.log(book);
      res.render('show', { books: book.body.items });
    });

  const PORT = process.env.PORT || 3099
  app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));


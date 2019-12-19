'use strict';


// call in all requirements for project
const PORT = process.env.PORT || 3000
require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');

// function to handle errors
function errors(error, response) {
  console.error(error);
  response.render('./pages/error');
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

function Book(bookObject) {
  this.title = bookObject.volumeInfo.title
  this.authors = bookObject.volumeInfo.authors
  this.description = bookObject.volumeInfo.description
  this.image_url = bookObject.volumeInfo.imageLinks && bookObject.volumeInfo.imageLinks.thumbnail;
}



// credit for this functionality is from class demo
app.post('/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.searchType}+in${req.body.query}`)
    .then(data => {
      const books = data.body.items.map(book => new Book(book));
      res.render('./pages/show', { books });
    })
    .catch(err => {
      errors(err, res)
    });
})

// yosh helped me write the error function


app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));


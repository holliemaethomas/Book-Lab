'use strict';


// call in all requirements for project
const PORT = process.env.PORT || 3099
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const app = express();
const superagent = require('superagent');


const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', e => console.error(e));
client.connect();


// set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

/////app.get for home page
app.get('/', (req, res) => {
  const allTableData = 'SELECT * FROM readtheseyo';
  client.query(allTableData).then(function(renderTable){
    // console.logs(renderTable);
    const arrayOBooks = sqlData.rows;
    // console.log(sqlData.rows);
    if(arrayOBooks.length > 0){
      res.render('index', {arrayOBooks: arrayOBooks});
    }else{
      res.render('index');
    }
  });

  res.render('./pages/index');
});

function renderTable (renderTable){
  // console.logs(renderTable.rows);
  const arrayOBooks = sqlData.rows;
}


///// constructor
// function ObjectifyBook (title, author) {
//   this.title = title,
//   this.author = author
//   this.formatted_query = formatted_address,
//   this.search_query = search_query
// }

/////route creation?
app.get('/show', showresults);
function showresults(req, res){
  res.render('show')
}

app.post('/show', handleShowresults);
function handleShowresults(req, res){
  res.render('show')
}


app.post('/', (req, res) => {

  const query = 'Star Wars';

  console.log(query);

  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`).then(bookInfo => {

    // console.log(bookInfo.body.items);

    console.log(bookInfo);

    // const books = data.body.items.map(book => ({name: book.volumeInfo.title}));

    res.render('./pages/index', {books: bookInfo.body.items});

    // res.render('book-results', {
    //   books: books
    // });
  });
});



app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));



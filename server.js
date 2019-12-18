'use strict';


const express = require('express');
const superagent = require('superagent');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${'star wars'}`)
    .then( bookResponse => {
      // console.log(bookResponse);
      res.render('index', { books: bookResponse.body.items});
    });

});

const PORT = process.env.PORT || 3099
app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));


// require('dotenv').config();
// const pg = require('pg');


// const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', e => console.error(e));
// client.connect();



// app.use(express.urlencoded({ extended: true }));

///////////////
// app.use(express.static('/styles/layout.css'));

/////app.get for home page
// const allTableData = 'SELECT * FROM readtheseyo';
// client.query(allTableData).then(function(renderTable){
// console.logs(renderTable);
// const arrayOBooks = sqlData.rows;
// console.log(sqlData.rows);
// if(arrayOBooks.length > 0){
//   res.render('index', {arrayOBooks: arrayOBooks});
// }else{
//   res.render('index');
// }
// });

////////////////
// app.get('/', (req, res) => {
//   res.render('./pages/index');
// });

// function renderTable (renderTable){
// console.logs(renderTable.rows);
// const arrayOBooks = sqlData.rows;
// }


///// constructor
// function ObjectifyBook (title, author) {
//   this.title = title,
//   this.author = author
//   this.formatted_query = formatted_address,
//   this.search_query = search_query
// }

/////route creation?
// app.get('/show', showresults);
// function showresults(req, res){
//   res.render('show')
// }

// app.post('/show', handleShowresults);
// function handleShowresults(req, res){
//   res.render('show')
// }


// app.post('/', (req, res) => {
// superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${ 'Star Wars' }`)
//     .then(bookInfo => {
//       console.log(bookInfo);
//       res.render('index');
//     });

// });




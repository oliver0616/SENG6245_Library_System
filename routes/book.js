var express = require('express');
var router = express.Router();
const db = require('../config/database');

// Description: Get all books from database
// Route: POST /api/book/getAllBooks
router.post('/getAllBooks', (req, res) => {
    db.any('SELECT bookid,name,author FROM public."Book"', req.body.email).then(books =>
    {
        res.json(books);
    });
});

// Description: Get the book information using bookId
// Route: POST /api/book/getAllBooks
router.post('/getBookById', (req, res) => {
    db.any('SELECT * FROM public."Book" WHERE bookid = $1',req.body.bookId).then(book =>{
        res.json(book);
    });
});

// Description: Download the book given book Id
// Route: POST /api/book/downloadBookById
router.post('/downloadBookById', (req, res) => {
    try {
        console.log("download book pdf");
        const file = `${__dirname}/books/${req.body.bookId}.pdf`;
        res.download(file);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
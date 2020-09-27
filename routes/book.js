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

module.exports = router;
var express = require('express');
var router = express.Router();
const db = require('../config/database');

// Description: Search book, using name and keywords. Simple search using like clause
// Route: POST /api/search/simpleSearch
router.post('/simpleSearch', (req, res) => {
    const searchString = "%"+req.body.searchText+"%".toLowerCase();

    // db.any('SELECT * FROM public."Book" WHERE LOWER(name) LIKE $1 OR LOWER(author) LIKE $1', [searchString]).then(books =>
    db.any('SELECT * FROM public."Book"', [searchString]).then(books =>
    {
        res.json(books);
    });
});

module.exports = router;

// helpful link for search in postgresql: https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/
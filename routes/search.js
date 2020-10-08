var express = require('express');
var router = express.Router();
const db = require('../config/database');

// Description: Search book, using book name and author name. Simple search using like clause
// Route: POST /api/search/simpleSearch
router.post('/simpleSearch', (req, res) => {
    const searchString = "%"+req.body.searchText+"%".toLowerCase();
    db.any('SELECT * FROM public."Book" WHERE LOWER(name) LIKE $1 OR LOWER(author) LIKE $1', [searchString]).then(books =>
    {
        res.json(books);
    });
});

// Description: Search book, using book name, author and keywords. Detail search that grab all partcial match
// Route: POST /api/search/detailSearch
router.post('/detailSearch', (req, res) => {

    // Process query
    var searchTextSet = new Set(req.body.searchText.split(" "));

    db.any(`SELECT * FROM public."Book"`).then(books => {
        var splitSearchText = req.body.searchText.split(" ");
        var searchResultDict = {};
        var searchResultList = [];
        var bookCounter = 0

        for (var eachBook of books) {
            var currentKeyList = [];
            if (req.body.bookNameOption == true) {
                currentKeyList = currentKeyList.concat(eachBook["name"].split(" "))
            }
            if (req.body.authorNameOption == true) {
                currentKeyList = currentKeyList.concat(eachBook["author"].split(" "))
            }
            if (req.body.keywordOption == true) {
                currentKeyList = currentKeyList.concat(eachBook["keywords"].split(","))
            }
            var currentKeyDict = {}
            for (var eachWord of currentKeyList) {
                if (currentKeyDict[eachWord.toLowerCase()] == undefined) {
                    currentKeyDict[eachWord.toLowerCase()] = 1
                } else {
                    currentKeyDict[eachWord.toLowerCase()] += 1
                }
            }
            
            var currentScore = 0;
            // Searching
            for (var eachQueryWord of searchTextSet) {
                if (currentKeyDict[eachQueryWord.toLowerCase()] !== undefined) {
                    currentScore += currentKeyDict[eachQueryWord.toLowerCase()]
                }
            }
            if (currentScore !== 0) {
                if (searchResultDict[currentScore] == undefined) {
                    searchResultDict[currentScore] = [bookCounter]
                } else {
                    searchResultDict[currentScore].push(bookCounter)
                }
            }
            bookCounter += 1;
        }

        for (var eachKey of Object.keys(searchResultDict)) {
            for (var eachBookIndex of searchResultDict[eachKey]) {
                searchResultList.unshift(books[eachBookIndex]);
            }
        }
        res.json(searchResultList)
    });
    
});

module.exports = router;

// helpful link for search in postgresql: https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/
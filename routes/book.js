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

// Description: add a new book
// Route: Post /api/book/addNewBook
router.post('/addNewBook', (req, res) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    db.any('INSERT INTO public."Book" Values (default, $1, $2, $3, $4, $5, $6) RETURNING public."Book".bookid', [req.body.bookName, req.body.keywords, currentTimestamp, req.body.authorName, "{}", req.body.description]).then(bookId => {
        const currentBookId = bookId[0].bookid;
        res.json({"currentBookId":currentBookId});
    });
});

// Description: upload book cover
// Route: Post /api/book/uploadBookCover
router.post('/uploadBookCover', (req, res) => { 
    const bookCover = req.files.bookCover;
    const bookCoverName = req.body.bookId.toString()+".jpg"
    bookCover.mv(`${__dirname}/../client/public/img/${bookCoverName}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
    });
});

// Description: upload book pdf
// Route: Post /api/book/uploadBookPdf
router.post('/uploadBookPdf', (req, res) => { 
    const pdfFile = req.files.pdfFile;
    const pdfFileName = req.body.bookId.toString()+".pdf"

    pdfFile.mv(`${__dirname}/books/${pdfFileName}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
    });
});

// Description: edit a book given bookId
// Route: Post /api/book/editBook
router.post('/editBook', (req, res) => {
    db.any('UPDATE public."Book" SET name = $1, keywords = $2, author = $3, description = $4 WHERE bookid = $5', [req.body.bookName, req.body.keywords, req.body.authorName, req.body.description, req.body.bookId]).then(dbRes =>{
        res.json({msg: "Book edit successful"});
    }).catch(err => {
        console.log(err);
    })
});


// Description: add a new comment into db
// Route: Post /api/book/addComment
router.post('/addComment', (req, res) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    db.any('INSERT INTO public."Comment" VALUES (default,$1,$2,$3,$4)', [req.body.bookId, req.body.userId, currentTimestamp, req.body.userComment]).then(
        res.json({msg: "Comment added"})
    ).catch(err => {
        console.log(err);
    })
});

// Description: get all comments by book id
// Route: Post /api/book/getBookCommentById
router.post('/getBookCommentById', (req, res) => {
    db.any('SELECT commentid, timestamp,commenttext, displayname FROM public."Comment" LEFT JOIN public."User" ON "Comment".userId = "User".userId WHERE "Comment".bookid = $1 ORDER BY timestamp DESC', [req.body.bookId]).then(comments => {
        res.json(comments);
    }).catch(err => {
        console.log(err);
    })
});

// Description: delete comment by comment id
// Route: Post /api/book/deleteCommentById
router.post('/deleteCommentById', (req, res) => {
    console.log(req.body);
    db.any('DELETE FROM public."Comment" WHERE commentid = $1', [req.body.commentId]).then(
        res.json({msg: "comment deleted"})
    ).catch(err => {
        console.log(err);
    })
});

module.exports = router;
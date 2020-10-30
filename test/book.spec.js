// test/book.spec.js
var request = require('request');
const chai = require('chai');
var assert = chai.assert;    // Using Assert style
const db = require('../config/database');

const bookApiAddress = "http://localhost:5000/api/book";

describe('Testing book controller', function(){

    before('Fire up', function() {
        // Add dummy book data
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [2, 'testBookName2', 'word1,word2,word3', 123456, 'testAuthorName2', '{}', 'this is the test book2']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [3, 'testBookName3', 'word1,word2,word3', 123456, 'testAuthorName3', '{}', 'this is the test book3']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [4, 'testBookName4', 'word1,word2,word3', 123456, 'testAuthorName4', '{}', 'this is the test book4']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [5, 'testBookName5', 'word1,word2,word3', 123456, 'testAuthorName5', '{}', 'this is the test book5']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [6, 'testBookName6', 'word1,word2,word3', 123456, 'testAuthorName6', '{}', 'this is the test book6']);
        // Add dummy comment data
        db.any('INSERT INTO public."Comment" Values ($1, $2, $3, $4, $5)',[2, 2, 1, 123456, "This is the test comment data"]);
        db.any('INSERT INTO public."Comment" Values ($1, $2, $3, $4, $5)',[3, 2, 1, 123456, "This is the test comment data2"]);
        // Add dummy user data
        db.any('INSERT INTO public."User" Values ($1, $2, $3, $4, $5)', [1, "tester", "test@test.com", "$2a$10$n4gHEZbC6EHiZlsP9Z8Btui0ltPwVpRBB.onDAps1HT8k7UC1RNx2", "0"]);
    });

    after('Clean up', function() {
        // Clean up Book Table
        db.any('ALTER SEQUENCE "Book_bookid_seq" RESTART');
        db.any('DELETE FROM public."Book"');
        // Clean up Comment Table
        db.any('ALTER SEQUENCE "Comment_commentid_seq" RESTART');
        db.any('DELETE FROM public."Comment"');
        // Clean up User Table
        db.any('DELETE FROM public."User"');
    });

    // addNewBook
    it('add a new book', function(done){
        const testBookData = {
            "bookName": "testBookName",
            "authorName": "testAuthorName",
            "keywords": "word1,word2,word3",
            "description": "this is the test book"
        }

        request.post({url:`${bookApiAddress}/addNewBook`,json:testBookData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });

    // getAllBooks
    it('retrieve all books', function(done){
        request.post(`${bookApiAddress}/getAllBooks`, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            var parsedBody = JSON.parse(body);
            assert.isAtLeast(parsedBody.length, 4);
            done();
        });
    });

    // deleteBookById
    it('delete book by id', function(done){
        request.post({url:`${bookApiAddress}/deleteBookById`,json:{"bookId":6}}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "Book Deleted Successfully");
            done();
        });
    });

    //getBookById
    it('get book by book id', function(done){
        request.post({url:`${bookApiAddress}/getBookById`,json:{"bookId":2}}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body[0].name, "testBookName2");
            assert.equal(body[0].keywords, "word1,word2,word3");
            assert.equal(body[0].timestamp, "123456");
            assert.equal(body[0].author, "testAuthorName2");
            assert.equal(body[0].description, "this is the test book2");
            done();
        });
    });

    //editBook
    it('edit book by book id', function(done){
        const editVersion = {
            bookName: "editBookName",
            keywords: "editKeyword1,editKeyword2",
            authorName: "editAuthorName",
            description: "this is the edit version of the book",
            bookId: 3
        }
        request.post({url:`${bookApiAddress}/editBook`,json:editVersion}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "Book edit successful");
            request.post({url:`${bookApiAddress}/getBookById`,json:{"bookId":3}}, function(error, response, body) {
                assert.equal(body[0].name, "editBookName");
                assert.equal(body[0].keywords, "editKeyword1,editKeyword2");
                assert.equal(body[0].author, "editAuthorName");
                assert.equal(body[0].description, "this is the edit version of the book");
                done();
            });
        });
    });

    //addComment
    it('add new comment for a book', function(done){
        const commentData = {
            bookId: 2,
            userId: 1,
            userComment: "this is the test comment for addComment"
        }
        request.post({url:`${bookApiAddress}/addComment`,json:commentData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "Comment added");
            done();
        });
    });

    //getBookCommentById
    it('get comment by book id', function(done){
        request.post({url:`${bookApiAddress}/getBookCommentById`,json:{bookId: 2}}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.isAtLeast(body.length, 2);
            done();
        });
    });

    //deleteCommentById
    it('delete comment by comment id', function(done){
        request.post({url:`${bookApiAddress}/deleteCommentById`,json:{commentId: 3}}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "comment deleted");
            done();
        });
    });

});

//downloadBookById, uploadBookCover, uploadBookPdf
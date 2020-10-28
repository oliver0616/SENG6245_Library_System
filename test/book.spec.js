// test/book.spec.js
const book = require('../routes/book');
var request = require('request');
const chai = require('chai');
// var assert = chai.assert;    // Using Assert style
// var expect = chai.expect;    // Using Expect style
// var should = chai.should();  // Using Should style
const bookApiAddress = "http://localhost:5000/api/book";
describe('book controller', function(){
    var bookId = null;
    // addNewBook
    it('add a new book', function(){
        const testBookData = {
            "bookName": "testBookName",
            "authorName": "testAuthorName",
            "keywords": "word1,word2,word3",
            "description": "this is the test book"
        }

        request.post({url:`${bookApiAddress}/addNewBook`,json:testBookData}, function(error, response, body) {
           bookId = body.currentBookId;

        })
    });

    // getAllBooks
    it('retrieve all books', function(){
        request.post(`${bookApiAddress}/getAllBooks`, function(error, response, body) {
            // console.log(response);
            // console.log(body);
            // console.log("here");
            // console.log(response.statusCode);
        })
    });

    // it('get the book by book id', function(){
    //     request.post({url:`${bookApiAddress}/getBookById`, json:{bookId: 0}}, function(error, response, body) {
    //         // console.log(response);
    //         // console.log(body);
    //     })
    // });

    

});
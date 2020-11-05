// test/history.spec.js
var request = require('request');
const chai = require('chai');
var assert = chai.assert;    // Using Assert style
const db = require('./testDatabase');

const searchApiAddress = "http://localhost:5000/api/search";

describe('Testing search controller', function(){  

    before('Fire up', function(done) {
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [21, 'book number 21', 'happy,angry', 123456, 'authorName', '{}', 'this is the test book 21']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [22, 'book number 22', 'angry,sad', 123456, 'authorName', '{}', 'this is the test book 22']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [23, 'book number 23', 'apple,banana', 123456, 'authorOtherName', '{}', 'this is the test book 23']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [24, 'book 24 not found', 'sunny', 123456, 'authorOtherName found', '{}', 'this is the test book 24']);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [25, 'book 25 not found', 'sunny,cloudy', 123456, 'authorOtherName', '{}', 'this is the test book 25']);
        done();
    });

    after('Clean up', function(done) {
        // Clean up Book Table
        db.any('ALTER SEQUENCE "Book_bookid_seq" RESTART');
        db.any('DELETE FROM public."Book"');
        done();
    });

    // simpleSearch
    it('searching for author and book name, search "book number"', function(done){
        const testSearchData = {
            searchText: "book number"
        }

        request.post({url:`${searchApiAddress}/simpleSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.length, 3);
            done();
        });
    });

    it('searching for author and book name, search "book"', function(done){
        const testSearchData = {
            searchText: "book"
        }

        request.post({url:`${searchApiAddress}/simpleSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.length, 5);
            done();
        });
    });

    it('searching for author and book name, search "not found"', function(done){
        const testSearchData = {
            searchText: "not found"
        }

        request.post({url:`${searchApiAddress}/simpleSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.length, 2);
            done();
        });
    });

    it('searching for author and book name, search "book found"', function(done){
        const testSearchData = {
            searchText: "book found"
        }

        request.post({url:`${searchApiAddress}/simpleSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.length, 0);
            done();
        });
    });

    //detailSearch
    it('detail searching for author, keywords and book name, search "book found"', function(done){
        const testSearchData = {
            searchText: "book found",
            bookNameOption: true,
            authorNameOption: true,
            keywordOption: true
        }

        request.post({url:`${searchApiAddress}/detailSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body[0].bookid, 24);
            assert.equal(body[1].bookid, 25);
            done();
        });
    });

    it('detail searching for author, keywords and book name, search "angry authorname 21"', function(done){
        const testSearchData = {
            searchText: "angry authorname 21",
            bookNameOption: true,
            authorNameOption: true,
            keywordOption: true
        }

        request.post({url:`${searchApiAddress}/detailSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.length, 2);
            assert.equal(body[0].bookid, 21);
            assert.equal(body[1].bookid, 22);
            done();
        });
    });

    it('detail searching for author, keywords and book name, search "aNgRy aUthORnaMe 21"', function(done){
        const testSearchData = {
            searchText: "aNgRy aUthORnaMe 21",
            bookNameOption: true,
            authorNameOption: true,
            keywordOption: true
        }

        request.post({url:`${searchApiAddress}/detailSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.length, 2);
            assert.equal(body[0].bookid, 21);
            assert.equal(body[1].bookid, 22);
            done();
        });
    });

    it('detail searching for author, keywords and book name, search "happy angry number"', function(done){
        const testSearchData = {
            searchText: "happy angry number",
            bookNameOption: true,
            authorNameOption: true,
            keywordOption: true
        }

        request.post({url:`${searchApiAddress}/detailSearch`,json:testSearchData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.length, 3);
            assert.equal(body[0].bookid, 21);
            assert.equal(body[1].bookid, 22);
            assert.equal(body[2].bookid, 23);
            done();
        });
    });

});
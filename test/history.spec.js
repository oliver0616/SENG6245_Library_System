// test/history.spec.js
var request = require('request');
const chai = require('chai');
var assert = chai.assert;    // Using Assert style
const db = require('../config/testDatabase');

const historyApiAddress = "http://localhost:5000/api/history";

describe('Testing history controller', function(){ 

    before('Fire up', function(done) {
        // Add dummy like book history data
        db.any('INSERT INTO public."UserLikedHistory" Values ($1, $2, $3)', [10, 10, 12345]);
        db.any('INSERT INTO public."UserLikedHistory" Values ($1, $2, $3)', [10, 13, 12345]);
        // Add dummy view book history data
        db.any('INSERT INTO public."UserBookHistory" Values ($1, $2, $3)', [10, 10, 12345]);
        // Add dummy download book history data
        db.any('INSERT INTO public."UserDownloadHistory" Values ($1, $2, $3)', [10, 10, 12345]);
        // Add dummy user data
        db.any('INSERT INTO public."User" Values ($1, $2, $3, $4, $5)', [10, "tester", "testHistory@test.com", "$2a$10$n4gHEZbC6EHiZlsP9Z8Btui0ltPwVpRBB.onDAps1HT8k7UC1RNx2", "0"]);
        // Add dummy book data
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [10, "testBook", "word1,word2", 123456, "testAuthor", "{}", "test book description"]);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [12, "testBook2", "word1,word2", 123456, "testAuthor2", "{}", "test book description2"]);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [13, "testBook3", "word1,word2", 123456, "testAuthor3", "{}", "test book description3"]);
        db.any('INSERT INTO public."Book" Values ($1, $2, $3, $4, $5, $6, $7)', [14, "testBook3", "word1,word2", 123456, "testAuthor3", "{}", "test book description3"]);
        done();
    });

    after('Clean up', function(done) {
        // Clean up Book Table
        db.any('ALTER SEQUENCE "Book_bookid_seq" RESTART');
        db.any('DELETE FROM public."Book"');
        // Clean up User Table
        db.any('ALTER SEQUENCE "User_userid_seq" RESTART');
        db.any('DELETE FROM public."User"');
        // Clean up all history
        db.any('DELETE FROM public."UserLikedHistory"');
        db.any('DELETE FROM public."UserDownloadHistory"');
        db.any('DELETE FROM public."UserBookHistory"');
        done();
    });

    // checkLikeBook
    it('Check like of the book, expect true', function(done){
        const testLikedData = {
            userId: 10,
            bookId: 10
        }

        request.post({url:`${historyApiAddress}/checkLikeBook`,json:testLikedData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.liked, true);
            done();
        });
    });

    it('Check like of the book, expect false', function(done){
        const testNotLikedData = {
            userId: 10,
            bookId: 12
        }
        request.post({url:`${historyApiAddress}/checkLikeBook`,json:testNotLikedData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.liked, false);
            done();
        });
    });

    //getLikeHistory
    it('Get a record of like history', function(done){
        const testLikedData = {
            userId:10
        }
        request.post({url:`${historyApiAddress}/getLikeHistory`,json:testLikedData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.isAtLeast(body.length, 1);
            done();
        });
    });

    //likeBook
    it('Like a book', function(done){
        const testLikedData = {
            userId:10,
            bookId:14,
        }
        request.post({url:`${historyApiAddress}/likeBook`,json:testLikedData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.successLiked, true);
            request.post({url:`${historyApiAddress}/checkLikeBook`,json:testLikedData}, function(error, response, body) {
                assert.equal(response.statusCode, 200);
                assert.equal(body.liked, true);
                done();
            });
        });
    });

    //removeLikeBook
    it('Remove the liked record', function(done){
        const testLikedData = {
            userId:10,
            bookId:13,
        }
        request.post({url:`${historyApiAddress}/removeLikeBook`,json:testLikedData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.successRemoveLike, true);
            done();
        });
    });

    //addDownloadHistory
    it('Add the record for download history', function(done){
        const testDownloadData = {
            userId:10,
            bookId:12
        }
        request.post({url:`${historyApiAddress}/addDownloadHistory`,json:testDownloadData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.successLiked, true);
            done();
        });
    });

    //getDownloadHistory
    it('Get all download history', function(done){
        const testDownloadData = {
            userId:10
        }
        request.post({url:`${historyApiAddress}/getDownloadHistory`,json:testDownloadData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.isAtLeast(body.length, 1);
            done();
        });
    });

    //addUpdateViewHistory
    it('Add new view history', function(done){
        const testViewData = {
            userId:10,
            bookId:11
        }
        request.post({url:`${historyApiAddress}/addUpdateViewHistory`,json:testViewData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "Add new view record");
            done();
        });
    });

    it('Update exist view history', function(done){
        const testViewData = {
            userId:10,
            bookId:10
        }
        request.post({url:`${historyApiAddress}/addUpdateViewHistory`,json:testViewData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "Update view record");
            done();
        });
    });

    //getViewHistory
    it('Get all view history', function(done){
        const testViewData = {
            userId:10
        }
        request.post({url:`${historyApiAddress}/getViewHistory`,json:testViewData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.isAtLeast(body.length, 1);
            done();
        });
    });

});
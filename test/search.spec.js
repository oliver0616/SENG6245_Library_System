// test/history.spec.js
var request = require('request');
const chai = require('chai');
var assert = chai.assert;    // Using Assert style
const db = require('./testDatabase');

const searchApiAddress = "http://localhost:5000/api/search";

describe('Testing search controller', function(){  

    // before('Fire up', function() {
    //     // Add dummy user data
    //     db.any('INSERT INTO public."User" Values ($1, $2, $3, $4, $5)', [1, "tester", "test@test.com", "$2a$10$n4gHEZbC6EHiZlsP9Z8Btui0ltPwVpRBB.onDAps1HT8k7UC1RNx2", "0"]);
    // });

    // after('Clean up', function() {
    //     // Clean up User Table
    //     db.any('ALTER SEQUENCE "User_userid_seq" RESTART');
    //     db.any('DELETE FROM public."User"');
    // });

    // signup
    // it('signup new user', function(done){
    //     const testUserData = {

    //     }
        // const testIssueData = {
        //     userId: 1,
        //     title: "test issue title",
        //     description: "this is a test issue data",
        //     priority: 5
        // }

        // request.post({url:`${searchApiAddress}/submitIssue`,json:testIssueData}, function(error, response, body) {
        //     assert.equal(response.statusCode, 200);
        //     assert.equal(body.msg, "issue has been submitted");
        //     done();
        // });
    // });

});
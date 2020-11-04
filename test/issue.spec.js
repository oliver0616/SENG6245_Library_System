// test/issue.spec.js
var request = require('request');
const chai = require('chai');
var assert = chai.assert;    // Using Assert style
const db = require('./testDatabase');

const issueApiAddress = "http://localhost:5000/api/issue";

describe('Testing issue controller', function(){

    before('Fire up', function(done) {
        // Add dummy issue data
        db.any('INSERT INTO public."IssueForm" Values ($1, $2, $3, $4, $5)', [2, 1, "test issue title1", "this is a test issue data1", 1]);
        db.any('INSERT INTO public."IssueForm" Values ($1, $2, $3, $4, $5)', [3, 1, "test issue title2", "this is a test issue data2", 2]);
        db.any('INSERT INTO public."IssueForm" Values ($1, $2, $3, $4, $5)', [4, 1, "test issue title3", "this is a test issue data3", 3]);
        done();
    });

    after('Clean up', function(done) {
        // Clean up Issue Table
        db.any('ALTER SEQUENCE "IssueForm_issueid_seq" RESTART');
        db.any('DELETE FROM public."IssueForm"');
        done();
    });

    // submitIssue
    it('add a new issue', function(done){
        const testIssueData = {
            userId: 1,
            title: "test issue title",
            description: "this is a test issue data",
            priority: 5
        }

        request.post({url:`${issueApiAddress}/submitIssue`,json:testIssueData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "issue has been submitted");
            done();
        });
    });

    // getAllIssues
    it('get all issues', function(done){
        request.post({url:`${issueApiAddress}/getAllIssues`}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.isAtLeast(body.length, 3);
            done();
        });
    });

    // deleteIssue
    it('delete issue using issue id', function(done){
        request.post({url:`${issueApiAddress}/deleteIssue`,json:{issueId: 4}}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "Issue Deleted");
            done();
        });
    });    
});
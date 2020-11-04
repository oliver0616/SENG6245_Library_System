// test/user.spec.js
var request = require('request');
const chai = require('chai');
var assert = chai.assert;    // Using Assert style
const db = require('./testDatabase');

const userApiAddress = "http://localhost:5000/api/user";

describe('Testing user controller', function(){

    before('Fire up', function(done) {
        // Add dummy user data
        db.any('INSERT INTO public."User" Values ($1, $2, $3, $4, $5)', [2, "tester", "test@test.com", "$2a$10$n4gHEZbC6EHiZlsP9Z8Btui0ltPwVpRBB.onDAps1HT8k7UC1RNx2", "0"]);
        db.any('INSERT INTO public."User" Values ($1, $2, $3, $4, $5)', [3, "tester3", "test3@test3.com", "$2a$10$n4gHEZbC6EHiZlsP9Z8Btui0ltPwVpRBB.onDAps1HT8k7UC1RNx2", "0"]);
        db.any('INSERT INTO public."User" Values ($1, $2, $3, $4, $5)', [4, "tester4", "test4@test4.com", "$2a$10$n4gHEZbC6EHiZlsP9Z8Btui0ltPwVpRBB.onDAps1HT8k7UC1RNx2", "0"]);
        db.any('INSERT INTO public."User" Values ($1, $2, $3, $4, $5)', [5, "tester5", "test5@test5.com", "$2a$10$n4gHEZbC6EHiZlsP9Z8Btui0ltPwVpRBB.onDAps1HT8k7UC1RNx2", "0"]);
        done();
    });

    after('Clean up', function(done) {
        // Clean up User Table
        db.any('ALTER SEQUENCE "User_userid_seq" RESTART');
        db.any('DELETE FROM public."User"');
        done();
    });

    // signup
    it('signup new user', function(done){
        const testUserData = {
            name: "testName",
            email: "testEmail@email.com",
            password: "testPassword",
            roleId: 0
        }

        request.post({url:`${userApiAddress}/signup`,json:testUserData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.msg, "New user created");
            done();
        });
    });
    // signup fail with exit email
    it('signup fail with exist user eamil', function(done){
        const testUserData = {
            name: "existEmail",
            email: "test@test.com",
            password: "testPassword",
            roleId: 0
        }

        request.post({url:`${userApiAddress}/signup`,json:testUserData}, function(error, response, body) {
            assert.equal(response.statusCode, 400);
            assert.equal(body.email, "Email already exists, please try a different email address");
            done();
        });
    });

    // login
    it('login exist user', function(done){
        const testUserData = {
            email: "test@test.com",
            password: "password"
        }
        request.post({url:`${userApiAddress}/login`,json:testUserData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.success, true);
            assert.isNotEmpty(body.token);
            done();
        });
    });

    // login email does not exist
    it('login fail with eamil does not exist', function(done){
        const testUserData = {
            email: "testNotExists@test.com",
            password: "password"
        }
        request.post({url:`${userApiAddress}/login`,json:testUserData}, function(error, response, body) {
            assert.equal(response.statusCode, 404);
            assert.equal(body.emailnotfound, "Email not found");
            done();
        });
    });

    // login fail with wrong password
    it('login fail with incorrect password', function(done){
        const testUserData = {
            email: "test@test.com",
            password: "incorrectPassword"
        }
        request.post({url:`${userApiAddress}/login`,json:testUserData}, function(error, response, body) {
            assert.equal(response.statusCode, 400);
            assert.equal(body.passwordincorrect, "Password incorrect");
            done();
        });
    });

    // changePassword
    it('change exist user password', function(done){
        const testUserData = {
            userId: "3",
            newPassword: "newPassword"
        }
        request.post({url:`${userApiAddress}/changePassword`,json:testUserData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.message, "Password updated");
            const newtestUserData = {
                email: "test3@test3.com",
                password: "newPassword"
            }
            request.post({url:`${userApiAddress}/login`,json:newtestUserData}, function(error, response, body) {
                assert.equal(response.statusCode, 200);
                assert.equal(body.success, true);
                assert.isNotEmpty(body.token);
                done();
            });
        });
    });

    // deleteAccount
    it('delete the account', function(done){
        const testUserData = {
            userId: 5
        }
        request.post({url:`${userApiAddress}/deleteAccount`,json:testUserData}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.equal(body.message, "User deleted");
            done();
        });
    });

    //listAllUser
    it('list all user', function(done){
        request.post({url:`${userApiAddress}/listAllUser`}, function(error, response, body) {
            assert.equal(response.statusCode, 200);
            assert.isAtLeast(body.length, 3);
            done();
        });
    });
});


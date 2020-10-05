var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../config/database');

// Description: Signup new user
// Route: POST /api/user/signup
router.post('/signup', (req, res) => {
    // Check if the user already exists
    db.any('SELECT email FROM public."User" WHERE email = $1', req.body.email).then(user =>
    {
        if(user.length != 0)
        {
            console.log("Email already exists");
            return res.status(400).json({email: "Email already exists"});
        } else {
            const newUser = {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "role": 0
            }
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) =>
            {
                bcrypt.hash(req.body.password, salt, (err, hash) =>
                {
                    if(err) throw err;
                    newUser.password = hash;
                    db.many('INSERT into public."User" ("displayname", "email", "password", "roleid") VALUES ($1,$2,$3,$4)', [newUser.name, newUser.email, newUser.password, newUser.role])
                    .then(console.log("New user created"))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// Description: login user
// Route: POST /api/user/login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    db.any('SELECT * FROM public."User" WHERE email = $1', req.body.email)
    .then(user =>
        {
            if(user.length == 0)
            {
                console.log("email not found");
                return res.status(404).json({emailnotfound: "Email not found"});
            }
            // Check password
            bcrypt.compare(password, user[0].password).then(isMatch =>
            {
                if(isMatch)
                {
                    // Create JWT Payload
                    const payload = {
                        userid: user[0].userid,
                        name: user[0].displayname,
                        role: user[0].roleid
                    };
                    // Sign token
                    jwt.sign(
                        payload,
                        "secretKey",
                        {
                            // expiresIn: 31556926 // 1 year in seconds
                            expiresIn: 86400 // 1 day in seconds
                        },
                        (err, token) =>
                        {
                            res.json({
                            success: true,
                            token: "Bearer " + token
                            });
                        }
                    );
                } else {
                    return res.status(400).json({passwordincorrect: "Password incorrect"});
                }

            });
        });
});

module.exports = router;
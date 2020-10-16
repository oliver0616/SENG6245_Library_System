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
            return res.status(400).json({email: "Email already exists, please try a different email address"});
        } else {
            const newUser = {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "role": req.body.roleId
            }
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) =>
            {
                bcrypt.hash(req.body.password, salt, (err, hash) =>
                {
                    if(err) throw err;
                    newUser.password = hash;
                    db.any('INSERT INTO public."User" VALUES (default,$1,$2,$3,$4)', [newUser.name, newUser.email, newUser.password, newUser.role])
                    .then(
                        res.status(200).json({message: "New user created"})
                    ).catch(err => {
                        res.status(500).json({dbErr: "Database error occurred, please try again"})
                    });
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

// Description: change password
// Route: POST /api/user/changePassword
router.post('/changePassword', (req, res) => {

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) =>
    {
        bcrypt.hash(req.body.newPassword, salt, (err, hash) =>
        {
            if(err) throw err;
            db.many('UPDATE public."User" SET password = $1 WHERE userid = $2', [hash, req.body.userId])
            .then(res.json({"message":"Password updated"}))
            .catch(err => res.status(500).json({dbErr: "Database error occurred, please try again"}));
        });
    });
});

// Description: delete current user
// Route: POST /api/user/deleteAccount
router.post('/deleteAccount', (req, res) => {
    db.many('DELETE FROM public."User" WHERE userid = $1', [req.body.userId])
    .then( res.json({"message":"User deleted"}))
    .catch(err => res.status(500).json({dbErr: "Database error occurred, please try again"}));
});

// Description: list all user
// Route: POST /api/user/listAllUser
router.post('/listAllUser', (req, res) => {
    db.many('SELECT userid,displayname,email,"Role".roleid,"Role".rolename FROM public."User" LEFT JOIN public."Role" ON "User".roleid = "Role".roleid')
    .then(dbRes => { res.json(dbRes)} )
});

module.exports = router;
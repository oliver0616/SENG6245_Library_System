var express = require('express');
var router = express.Router();
const db = require('../config/database');


// Like book history
// Description: Check book is likeed or not
// Route: POST /api/history/checkLikeBook
router.post('/checkLikeBook', (req, res) => {
    db.any('SELECT * FROM public."UserLikedHistory" WHERE userid = $1 AND bookid = $2', [req.body.userId, req.body.bookId]).then(dbRes =>
    {
        if (dbRes.length === 0) {
            res.json({"liked":false});
        } else{
            res.json({"liked":true});
        }
    }).catch(err =>{
        console.log(err);
    });
});

// Description: Get like history by userId
// Route: POST /api/history/getLikeHistory
router.post('/getLikeHistory', (req, res) => {
    db.any('SELECT "Book".bookid, "Book".name, "UserLikedHistory".timestamp FROM public."Book" LEFT JOIN public."UserLikedHistory" ON "Book".bookid = "UserLikedHistory".bookid WHERE "UserLikedHistory".userid = $1 ORDER BY timestamp DESC' ,[req.body.userId]).then(dbRes => {
        res.json(dbRes)
    }).catch(err => {
        console.log(err);
    });
});

// Description: Like a book given the bookId and userId
// Route: POST /api/history/likeBook
router.post('/likeBook', (req, res) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    db.any('INSERT into public."UserLikedHistory" ("userid", "bookid", "timestamp") VALUES ($1,$2,$3)', [req.body.userId, req.body.bookId, currentTimestamp]).then(dbRes =>
    {
        res.json({"successLiked":true});
    }).catch(err =>{
        console.log(err);
    });
});

// Description: Remove like of book given the bookId and userId
// Route: POST /api/history/removeLikeBook
router.post('/removeLikeBook', (req, res) => {
    db.any('DELETE FROM public."UserLikedHistory" WHERE userid = $1 AND bookid = $2', [req.body.userId, req.body.bookId]).then(dbRes =>
        {
            res.json({"successRemoveLike":true});
        }).catch(err =>{
            console.log(err);
        });
});

// Download book history
// Description: Add a new download history record
// Route: POST /api/history/addDownloadHistory
router.post('/addDownloadHistory', (req, res) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    db.any('INSERT into public."UserDownloadHistory" ("userid", "bookid", "timestamp") VALUES ($1,$2,$3)', [req.body.userId, req.body.bookId, currentTimestamp]).then(dbRes =>
    {
        res.json({"successLiked":true});
    }).catch(err =>{
        console.log(err);
    });

});

// Description: Get all download history using incoming userId
// Route: POST /api/history/getDownloadHistory
router.post('/getDownloadHistory', (req, res) => {
    db.any('SELECT "Book".bookid, "Book".name, "UserDownloadHistory".timestamp FROM public."Book" LEFT JOIN public."UserDownloadHistory" ON "Book".bookid = "UserDownloadHistory".bookid WHERE "UserDownloadHistory".userid = $1 ORDER BY timestamp DESC', [req.body.userId]).then(dbRes => {
        res.json(dbRes);
    }).catch(err => {
        console.log(err);
    });
});

// View book history
// Description: Add or update view book history
// Route: POST /api/history/addUpdateViewHistory
router.post('/addUpdateViewHistory', (req, res) => {
    // const currentTimestamp = Date.now();
    const currentTimestamp = Math.floor(Date.now() / 1000);
    db.any('UPDATE public."UserBookHistory" SET timestamp = $1 WHERE userid = $2 AND bookid = $3 RETURNING timestamp', [currentTimestamp, req.body.userId, req.body.bookId]).then(dbRes => {
        if (dbRes.length === 0) {
            // Create new record
            db.any('INSERT into public."UserBookHistory" ("userid", "bookid", "timestamp") VALUES ($1,$2,$3)', [req.body.userId, req.body.bookId, currentTimestamp])
        }
    });
});

// Description: Get all view history using provided userId, and book information for each record
// Route: POST /api/history/getViewHistory
router.post('/getViewHistory', (req, res) => {
    db.any('SELECT "Book".bookid, "Book".name, "UserBookHistory".timestamp FROM public."Book" LEFT JOIN public."UserBookHistory" ON "Book".bookid = "UserBookHistory".bookid WHERE "UserBookHistory".userid = $1 ORDER BY timestamp DESC', [req.body.userId]).then(dbRes => {
        res.json(dbRes);
    });
});


module.exports = router;
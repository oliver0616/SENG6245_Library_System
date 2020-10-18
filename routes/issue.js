var express = require('express');
var router = express.Router();
const db = require('../config/database');

// Description: Submit a issue
// Route: POST /api/issue/submitIssue
router.post('/submitIssue', (req, res) => {
    db.any('INSERT INTO public."IssueForm" Values (default,$1,$2,$3,$4)', [req.body.userId,req.body.title,req.body.description,req.body.priority])
    .then(res.json({"message": "issue has been submitted"}));
});

// Description: Get all issues
// Route: POST /api/issue/getAllIssues
router.post('/getAllIssues', (req, res) => {
    db.any('SELECT issueid,title,description,priority,displayname,email FROM public."IssueForm" LEFT JOIN public."User" ON "IssueForm".userid = "User".userid ORDER BY priority ASC').then(dbRes=> {
        res.json({issues: dbRes});
    })
});

// Description: delete the issue given the issueid
// Route: POST /api/issue/deleteIssue
router.post('/deleteIssue', (req, res) => {
    console.log(req.body);
    db.any('DELETE FROM public."IssueForm" WHERE issueid = $1',[req.body.issueId]).then(
        res.json({message: "Issue Deleted"})
    )
});

module.exports = router;
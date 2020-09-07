var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    console.log("hello world");
    res.json({"message":"hello world"});
});

module.exports = router;
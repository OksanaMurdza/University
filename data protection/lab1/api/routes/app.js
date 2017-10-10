const express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

    router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});


router.post('/takeData', (req, res) => {
    const reqString = req.param('reqString');

    con.query(`${reqString}`, function (err, result, fields) {
        if (err) throw err;
        else res.json({
            data: result
        })
    });

});

module.exports = router;
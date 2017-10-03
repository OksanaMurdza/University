const express     = require('express'),
      pgdb        = require('../libs/pgdb')(),
      bodyParser  = require('body-parser'),
      compression = require('compression'),

router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/generator', (req, res) => {
    const reqParam = req.param('requestValue');
    let reqString;
    
    if (reqParam == 0) {
        reqString = 'airport';
    } else if (reqParam == 1) {
        reqString = 'carrier'
    } else {
        reqString = 'plane'
    }
    
    pgdb.query(`select * from ${reqString}`)
        .then( d => {
            console.log(d);
            res.json({
                data: d
            })
        })
        .catch((err) => res.status(500).end())
});
module.exports = router;
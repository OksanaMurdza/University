const express = require('express'),
    pgdb = require('../libs/pgdb')(),
    bodyParser = require('body-parser'),
    multer = require('multer')(),
    
    router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


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
        .then(d => {
            res.json({
                data: d
            })
        })
        .catch((err) => res.status(500).end())
});


/**
 * @desc: upload file to server and send to client
 */
router.post('/upload', multer.single('file'), (req, res) => {
    let dataFile = req.file.buffer.toString();
    console.log('dataFile >>>>', dataFile);
    res.json({
        dataFile
    })
});

/**
 * @desc: delete all data in table
 * @param:
 *        requestValue - name table
 */
router.post('/delete', (req, res) => {
    const reqParam = req.param('requestValue');
    let reqString;
    
    if (reqParam == 0) {
        reqString = 'airport';
    } else if (reqParam == 1) {
        reqString = 'carrier'
    } else {
        reqString = 'plane'
    }
    
    pgdb.query(`delete from ${reqString}`)
        .then(() => res.json({status: 200}))
        .catch((err) => res.status(500).end())
});

/**
 * @desc: save data to dataBase
 * @param:
 *        reqParam - table name
 *        keys - column name
 *        dataFile - JSON data
 */
router.post('/uploadFileData', (req, res) => {
    const reqParam = req.param('requestValue');
    let dataFile = JSON.parse(req.param('data'));
    let keys = Object.keys(dataFile[0]);
    let dataString = '';
    
    console.log('dataFile >>>>', dataFile);
    Object.values(dataFile).map((item) => {
        dataString = '';
        keys.map((key, index) => {
            dataString += `'${item[key]}'`;
            if (index !== keys.length - 1)
                dataString += ', ';
        });
    
        console.log('reqParam >>>>', reqParam);
        console.log('keys.join(', ') >>>>', keys.join(', '));
        console.log('dataString >>>>', dataString);
        
        pgdb.query(`insert into ${reqParam} (${keys.join(', ').toLowerCase()})
                    values (${dataString})`
        )
            .then(() => res.json({status: 200}))
            .catch((err) => res.status(500).end())
    })
});

module.exports = router;
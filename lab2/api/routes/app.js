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
    
    switch (+reqParam) {
        case 0:
            reqString = 'airport';
            break;
        case 1:
            reqString = 'carrier';
            break;
        case 2:
            reqString = 'plane';
            break;
        case 3:
            reqString = 'facts';
            break;

        default:
            return;
    }
    
    console.log('reqString >>>>', reqString);
    
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
    
    switch (+reqParam) {
        case 0:
            reqString = 'airport';
            break;
        case 1:
            reqString = 'carrier';
            break;
        case 2:
            reqString = 'plane';
            break;
        case 3:
            reqString = 'facts';
            break;
        
        default:
            return;
    }
    
    pgdb.query(`delete from ${reqString}`)
        .then(() => res.json({status: 200}))
        .catch((err) => res.status(500))
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
    
   
    
    Object.values(dataFile).map((item) => {
        dataString = '';
        keys.map((key, index) => {
            dataString += `'${item[key]}'`;
            if (index !== keys.length - 1)
                dataString += ', ';
        });
        
        console.log('dataFile >>>>', reqParam);
        console.log('keys.join(, ) >>>>', keys.join(', '));
        console.log('dataString >>>>', dataString);
        
        
        pgdb.query(`insert into ${reqParam} (${keys.join(', ').toLowerCase()})
                    values (${dataString})`
        )
            .then(() => res.json({status: 200}))
            .catch((err) => res.status(500).end())
    })
});

module.exports = router;
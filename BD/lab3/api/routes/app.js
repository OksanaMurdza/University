const express = require('express');
const Sequelize = require('sequelize');

const { Airport, Carrier, Plane, Facts } = require('../../Model');

const sequelize = new Sequelize('lab3', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

router = express.Router();


router.get('/', (req, res) => {
    let factsPromise = new Promise((resolve) => {
        Facts.findAll().then(d => {
            let data = d.map((item) => {
                let {dataValues} = item;
                return dataValues
            });
            resolve(data);
        })
    });

    factsPromise.then((data) => res.json(data))
});
// Airport, Carrier, Plane, Facts
router.get('/takeMeasure', (req, res) => {

    let airportPromise = new Promise((resolve) => {
        Airport.findAll({attributes: ['id']}).then(d => {
            let data = d.map((item) => {
                let {dataValues} = item;
                return dataValues
            });
            resolve(data);
        })
    });

    let carrierPromise = new Promise((resolve) => {
        Carrier.findAll({attributes: ['id']}).then(d => {
            let data = d.map((item) => {
                let {dataValues} = item;
                return dataValues
            });
            resolve(data);
        })
    });

    let planePromise = new Promise((resolve) => {
        Plane.findAll({attributes: ['id']}).then(d => {
            let data = d.map((item) => {
                let {dataValues} = item;
                return dataValues
            });
            resolve(data);
        })
    });

    Promise.all([airportPromise, planePromise, carrierPromise]).then((d) => res.json(d));
});

router.get('/update', (req, res) => {
    const reqParam = JSON.parse(req.param('newData'));

    let factsPromise = new Promise(resolve => {
        Facts.destroy({where: {}, truncate: true})
            .then(() => Facts.bulkCreate(reqParam).then(() => resolve()))
    });

    factsPromise.then(() => res.json({status: 200}));
});


router.get('/addNew', (req, res) => {
    const reqParam = JSON.parse(req.param('newData'));

    let factsPromise = new Promise(resolve => {
        Facts.bulkCreate(reqParam).then(() => resolve())
    });

    factsPromise.then(() => res.json({status: 200}))
});

module.exports = router;
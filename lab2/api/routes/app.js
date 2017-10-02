const express     = require('express'),
      pgdb        = require('../libs/pgdb')(),
      bodyParser  = require('body-parser'),
      compression = require('compression'),
      jwt         = require('jsonwebtoken');

router = express.Router();
secureRoutes = express.Router();

router.use(compression({ level: 4 }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use('/map', secureRoutes);
process.env.SECRET_KEY = 'GJrPplLlyTDoECvYWjFPfGWZsguuVURd';

router.post('/', (req, res) => {
    pgdb.query(`select * from point_test`)
        .then( d => {
            res
                .status(200)
                .send(d)
        })
        .catch((err) => res.status(500).end())
});

router.post('/login', (req, res) => {
    const body = req.body;
    console.log('/login');
    console.log('req >>', req.body);
    pgdb.query(`select * from autorization where email='${body.email}' and password='${body.password}'`)
        .then(d => {
            if (d.length === 0) {
                res.status(401).end();
            } else {
                const user = {
                    userEmail: body.email,
                    password:  body.password
                };

                const token = jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: 4000
                });
                const userId = d[0].id;
                const userName = d[0].name
                res.json({
                    status: 200,
                    success: true,
                    token: token,
                    user_id: userId,
                    user_name: userName
                }).end()
            }
        })
        .catch((req, res) => {
            res.status(401).send('dyadya eto catch').end();
        });
});

router.post('/map', (req, res) => {

});

router.post('/map/add_point', (req, res) => {
    const body = req.body;
    
    const deepBuild = body.data.point.info.deep.build === 0
        ? `буд. ${body.data.point.info.deep.build}`
        : `буд. ${body.data.point.info.deep.build}/${body.data.point.info.deep.buildAfter}`;
    const geojson = JSON.stringify({
        "type": body.data.type,
        // "coordinates": [body.data.point.latlng.lat, body.data.point.latlng.lng]
        //FIX KOSTIL
        "coordinates": [body.data.point.latlng.lng, body.data.point.latlng.lat]
    });
    

    const id_korustuvacha = body.userId;
    const type_street_i = body.data.point.info.street;
    const name_street = body.data.point.info.street_name;
    const number_build = `${deepBuild}${body.data.point.info.deep.char} к. ${body.data.point.info.deep.type_build}`;
    const type_build = body.data.point.info.confession;
    const description = body.data.point.info.description;
    
    console.log(number_build);
    pgdb.query(`INSERT INTO point_test (id_korustuvacha, geojson, type_street_i, name_street, number_build, type_build, description, status) VALUES
    ('${id_korustuvacha}', '${geojson}', '${type_street_i}', '${name_street}', '${number_build}', '${type_build}', '${description}', 0)`);
    
    res.status(200).end();
});

router.post('/reg', (req, res) => {
    console.log('registration user');
    let  body = req.body;
    
    body = JSON.parse(body.jsonUser)
    

    pgdb.query(`select * from autorization where email='${body.email}'`)
        .then(d => {
            if (d.length === 0) {
                console.log('name >>', body)
                pgdb.query(`INSERT INTO autorization (name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}')`);
                res.status(201).end();
            } else {
                console.log(d);
                console.log('deprecated');
                res.status(400).end();
            }
        });
});

secureRoutes.use((req, res, next) => {
    console.log('middle ware', req.body);
    const token = req.body.token || req.headers['token'];
    
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                res.status(500).send('Invalid token');
            } else {
                console.log('token is valid');
                res.status(200).send('Token is valid');
                next();
            }
        })
    } else {
        console.log('token null >>>>>>');
        res.status(401).send('dont have a token');
    }
});

secureRoutes.post('/map', router);

module.exports = router;
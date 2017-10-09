// FOR PRODUCTION
// module.exports = {
//     server : {
//         ip: 195.200.90.84,
//         port : 8180
//     },
//     db:{
//         user: 'postgres',
//         database: 'geocollector',
//         password: 'd12e143n972',
//         host: '192.168.30.11',
//         port: 5432,
//         max: 20, //set pool max size to 20
//         min: 10, //set min pool size to 4
//         idleTimeoutMillis: 30000 ,
//         application_name: 'gisportal'
//     },
// };

// FOR DEVELOPMENT
module.exports = {
    server : {
        ip: 'localhost',
        port : 3000
    },
    db:{
        user: 'postgres',
        database: 'lab2',
        password: 'zxc123',
        host: 'localhost',
        port: 5432,
        max: 20, //set pool max size to 20
        min: 10, //set min pool size to 4
        idleTimeoutMillis: 30000 ,
        application_name: 'gisportal'
    },
};

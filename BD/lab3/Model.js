  /*
    setup ORM file
  */


  const Sequelize = require('sequelize');
  const sequelize = new Sequelize('lab3', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });



  // Initialization

  const Airport = sequelize.define('airport', {
    name: {
      type: Sequelize.STRING
    },
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    city: {
      type: Sequelize.STRING
    }
  }, { timestamps: false });



  const Carrier = sequelize.define('carrier', {
    name: {
      type: Sequelize.STRING
    },
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    foundation: {
      type: Sequelize.STRING
    }
  }, { timestamps: false });



  const Plane = sequelize.define('plane', {
    model: {
      type: Sequelize.STRING
    },
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    capacity: {
      type: Sequelize.STRING
    }
  }, { timestamps: false });



  const Facts = sequelize.define('facts', {
    id_airport: {
      type: Sequelize.STRING
    },
    id_carrier: {
      type: Sequelize.STRING,
    },
    id_plane: {
      type: Sequelize.STRING,
      primaryKey: true
    }
  }, { timestamps: false });



  // add to table
  //
  // Airport.sync({force: true}).then(() => {
  //     return Airport.create({
  //       name: 'Julyani',
  //       id: 'K12A',
  //       city: 'Kiev'
  //   })
  // });
  //
  // Carrier.sync({force: true}).then(() => {
  //     return Carrier.create({
  //       name: 'Romashka',
  //       id: 'ZA01',
  //       foundation: '2007'
  //   })
  // });
  //
  //
  // Plane.sync({force: true}).then(() => {
  //     return Plane.create({
  //       capacity: '1000',
  //       id: 'J12AS',
  //       model: 'A-13'
  //   })
  // });
  //
  // Facts.sync({force: true}).then(() => {
  //     return Facts.create({
  //       id_airport: 'K12A',
  //       id_carrier: 'ZA01',
  //       id_plane: 'Kiev'
  //   })
  // });

  module.exports = { Airport, Plane, Carrier, Facts };

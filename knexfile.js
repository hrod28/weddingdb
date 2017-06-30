'use strict';
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'wedding'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};

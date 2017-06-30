'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('parking').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('parking').insert({
          id: 1,
          name: 'heidi rod',
          contact: 'hrod2645@gmail.com',
          comments: 'just email'

        })
        .then(() => {
          return knex.raw("SELECT setval('parking_id_seq', (SELECT MAX(id) FROM parking))");
      })
    ]);
  });
};

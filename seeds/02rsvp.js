'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rsvp').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('rsvp').insert({
          id: 1,
          first_name: 'heidi',
          last_name: 'rod',
          phone_number: '222222',
          email: 'hrod',
          guest_num: '3',
          questions: '3',
          comments: '3'
        })
        .then(() => {
          return knex.raw("SELECT setval('rsvp_id_seq', (SELECT MAX(id) FROM rsvp))");
      })
    ]);
  });
};

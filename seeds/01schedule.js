'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({
          id: 1,
          title: 'Jet Ski Fun!',
          description: 'Go fast on water YAY!',
          location: 'bring your life vest!!',
          budget: '3:30pm - 6:30pm'
        }),
        knex('posts').insert({
          id: 2,
          title: 'Photo Booth',
          description: 'Pi',
          location: 'bring your life vest!!',
          budget: '3:30pm - 6:30pm'
        })
        .then(() => {
          return knex.raw("SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts))");
    })
    ]);
  });
};

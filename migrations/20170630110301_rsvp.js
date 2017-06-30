'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('rsvp', (table) => {
    table.increments();
    table.text('first_name').defaultTo('');
    table.text('last_name').defaultTo('');
    table.text('phone_number').defaultTo('');
    table.text('email').defaultTo('');
    table.text('guest_num').defaultTo('');
    table.text('questions').defaultTo('');
    table.text('comments').defaultTo('');

  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rsvp');
};

'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('parking', (table) => {
    table.increments();
    table.text('name').defaultTo('');
    table.text('contact').defaultTo('');
    table.text('comments').defaultTo('');


  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parking');
};

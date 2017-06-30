'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');
const bcrypt = require('bcrypt');
const boom = require('boom');

//ROUTES ------------------------------------------------

//get user by id


router.get('/', (req, res) => {
  knex('parking')
    .orderBy('id', 'asc')
    .select('id', 'name', 'contact', 'comments')
    .then((results) => {
      res.json(results);
      console.log(results);
    })
    .catch((err)=>{
      res.send(err);
    });
});

router.get('/:id', (req,res) => {
  knex('parking')
    .select('id', 'name', 'contact', 'comments')
    .where({id: req.params.id})
    .then((results) => {
      res.json(results[0]);
    })
    .catch((err)=>{
      res.send(err);
    });
});

router.post('/', (req,res) => {
  console.log('reach post route');
  knex('parking')
    .insert({
      name: req.body.name,
      contact: req.body.contact,
      comments: req.body.comments

    }, ['id', 'name', 'contact', 'comments'])
    .then((result) => {
      console.log("RESULT", result[0]);
      res.send(result[0]);
    })
    .catch((err)=>{
      res.send(err);
    });
});

router.patch('/:id', (req,res) => {
  console.log('reach post route');
  knex('parking')
    .update({
      name: req.body.name,
      contact: req.body.contact,
      comments: req.body.comments
    }, ['name', 'contact', 'comments'])
    .where({id: req.params.id})
    .then((result) => {
      console.log("RESULT", result[0]);
      res.send(result[0]);
    })
    .catch((err)=>{
      res.send(err);
    });
});

router.delete('/:id', (req,res,next)=>{
  knex('parking')
  .where('id', req.params.id)
  .first()
  .then((response)=>{
    console.log(response);
    let toDelete = camelizeKeys(response);
    return knex('parking')
    .where('id', toDelete.id)
    .del()
    .then((deleted)=>{
      res.send(toDelete);
  });
});
});

module.exports = router;

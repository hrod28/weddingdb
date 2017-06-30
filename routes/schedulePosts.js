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
  knex('posts')
    .orderBy('id', 'asc')
    .select('id', 'title', 'description', 'location', 'budget')
    .then((results) => {
      res.json(results);
      console.log(results);
    })
    .catch((err)=>{
      res.send(err);
    });
});

router.get('/:id', (req,res) => {
  knex('posts')
    .select('id', 'title', 'description', 'location', 'budget')
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
  knex('posts')
    .insert({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      budget: req.body.budget
    }, ['id', 'title', 'description', 'location', 'budget'])
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
  knex('posts')
    .update({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      budget: req.body.budget
    }, ['id', 'title', 'description', 'location', 'budget'])
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
  knex('posts')
  .where('id', req.params.id)
  .first()
  .then((response)=>{
    console.log(response);
    let toDelete = camelizeKeys(response);
    return knex('posts')
    .where('id', toDelete.id)
    .del()
    .then((deleted)=>{
      res.send(toDelete);
  });
});
});

module.exports = router;

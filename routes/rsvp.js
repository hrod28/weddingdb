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
  knex('rsvp')
    .orderBy('id', 'asc')
    .select('id', 'first_name', 'last_name', 'phone_number', 'email', 'guest_num', 'questions', 'comments')
    .then((results) => {
      res.json(results);
      console.log(results);
    })
    .catch((err)=>{
      res.send(err);
    });
});

router.get('/:id', (req,res) => {
  knex('rsvp')
    .select('id', 'first_name', 'last_name', 'phone_number', 'email', 'guest_num', 'questions', 'comments')
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
  knex('rsvp')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      guest_num: req.body.guest_num,
      questions: req.body.questions,
      comments: req.body.comments
    }, ['id', 'first_name', 'last_name', 'phone_number', 'email', 'guest_num', 'questions', 'comments'])
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
  knex('rsvp')
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      guest_num: req.body.guest_num,
      questions: req.body.questions,
      comments: req.body.comments
    }, ['id', 'first_name', 'last_name', 'phone_number', 'email', 'guest_num', 'questions', 'comments'])
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
  knex('rsvp')
  .where('id', req.params.id)
  .first()
  .then((response)=>{
    console.log(response);
    let toDelete = camelizeKeys(response);
    return knex('rsvp')
    .where('id', toDelete.id)
    .del()
    .then((deleted)=>{
      res.send(toDelete);
  });
});
});

module.exports = router;

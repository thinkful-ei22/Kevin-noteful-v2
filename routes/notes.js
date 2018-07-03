'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
const knex = require('../knex');
// const notes = simDB.initialize(data);

// Get All (and search by query)
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  knex
    .select('notes.id', 'title', 'content')
    .from('notes')
    .modify(queryBuilder => {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .orderBy('notes.id')
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      next(err);
    });
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .select('notes.id', 'title', 'content')
    .from('notes')
    .modify(queryBuilder => {
      if (id) {
        queryBuilder.where('notes.id', `${id}`);
      }
      else {
        next();
      }
      
    })
    .returning(['id', 'title'])
    .then(([item]) => {
      if(item){
        res.json(item);
      }else{
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// Update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  // const updatedItem = {title: req.body.title, content: req.body.content};
  knex('notes')
    .update(updateObj)
    .where('id', id)
    .returning(['id', 'title', 'content'])
    .then(([item]) => {
      if(item){
        res.json(item);
      }else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  // notes.create(newItem)
  //   .then(item => {
  //     if (item) {
  //       res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
  //     }
  //   })
  //   .catch(err => {
  //     next(err);
  //   });

  knex
    .from('notes')
    .modify(queryBuilder => {
      if (newItem) {
        queryBuilder.insert(newItem);
      }
    })
    .returning(['id', 'title'])
    .then(([item]) => {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    })
    .catch(err => {
      next(err);
    });

});

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  // notes.delete(id)
  //   .then(() => {
  //     res.sendStatus(204);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
  knex
    .from('notes')
    .modify(queryBuilder => {
      if (id) {
        queryBuilder.where('notes.id', `${id}`).del();
      }
    })
    .returning(['id', 'title'])
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

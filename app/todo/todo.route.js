const express = require('express');
const router = express.Router();
const Todo = require('./todo.model');


// Profile
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Todo.findById(id, (error, todo) => {
    if (error) {
      res.json({ success: false, msg: 'todo with id:' + id + 'not found.' })
    }
    if (todo) {
      console.log(todo);
      res.json(todo);
    }
  })
});

router.get('/', (req, res, next) => {
  Todo.findAll((error, todos) => {
    if (error) {
      res.json({ success: false, msg: error.message })
    }
    if (todos) {
      res.json(todos);
    }
  });

});

router.post('/', (req, res, next) => {

  //if contains id, update
  if (req.body.id) {

    Todo.update({ "_id": req.body.id }, { "$set": req.body }, (error, data) => {
      if (error) {
        res.json({ success: false, msg: error.message })
      }
      res.json({ success: true, msg: 'updated!' })
    });

  } else {
    //else save

    Todo.create(req.body, function (error, todo) {
      if (error) {
        res.json({ success: false, msg: error.message })
      }
      res.json({ success: true, msg: 'saved!' })
    });

  }

});

router.delete('/:id', (req, res, next) => {

  Todo.remove({ _id: req.params.id }, (error) => {
    if (error) {
      res.json({ success: false, msg: error.message })
    }
    res.json({ success: true, msg: 'deleted!' })

  });

});

module.exports = router;
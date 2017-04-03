const express = require('express');
const router = express.Router();
const Todo = require('./todo.model');


// Profile
router.get('/:id',  (req, res, next) => {
  let id = req.params.id;
  Todo.findById(id, (error, todo)=>{
    if(error){
      res.json({success: false, msg: 'todo with id:' + id + 'not found.'})
    }
    if(todo){
      res.json(todo);
    }
  })
});

router.get('/',(req, res, next) => {
Todo.findAll((error, todos)=>{
  if(error){
    res.json({success: false, msg: error.message})
  }
  if(todos){
    res.json(todos);
  }
});

});

router.post('/', (req, res, next) => {

  let todo = new Todo({"nome": req.body.nome, "conteudo": req.body.conteudo});

//if contains id, update
  if(req.body.id){
    todo.update({_id: todo.id}, todo, (error, todo)=>{
      if(error){
        res.json({success: false, msg: error.message})
      }
      res.json({success: true, msg: 'updated!'})


    });
  } else {
//else save
  todo.save((error, todo) =>{
    if(error){
      res.json({success: false, msg: error.message})
    }
    res.json({success: true, msg: 'saved!'})
  });
  }

});

router.delete('/:id', (req, res, next) => {

 console.log('inside!!!');

  Todo.remove({ _id: req.params.id }, (error) => {
  if (error) {
    res.json({success: false, msg: error.message})
  }
});

});

module.exports = router;

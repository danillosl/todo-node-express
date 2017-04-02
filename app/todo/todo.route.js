const express = require('express');
const router = express.Router();
const Todo = require('./todo.model');


// Profile
router.get('/:id',  (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  Todo.findById(id, (error, todo)=>{
    if(error){
      console.log(error);
      res.json({success: false, msg: 'todo with id:' + id + 'not found.'})
    }
    if(todo){
      console.log(todo);
      res.json(todo);
    }
  })
});

router.get('/',(req, res, next) => {
Todo.findAll((error, todos)=>{
  if(error){
    console.log(error);
    res.json({success: false, msg: error.message})
  }
  if(todos){
    console.log(todos);
    res.json(todos);
  }
});

});

router.post('/', (req, res, next) => {
  console.log(req.body);
  let todo = new Todo({"nome": req.body.nome, "conteudo": req.body.conteudo});

  todo.save(error =>{
    if(error){
      res.json({success: false, msg: error.message})
    }
    res.json({success: true, msg: 'Todo saved!'})

  });

});

router.delete('/:id', (req, res, next) => {

  Tank.remove({ _id: req.params.id }, (error) => {
  if (error) {
    res.json({success: false, msg: error.message})
  }
});

});

module.exports = router;

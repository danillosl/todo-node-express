const mongoose = require('mongoose');

// User Schema
const TodoSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  }
});

const todo = module.exports = mongoose.model('todoModel', TodoSchema);

module.exports.findAll = function(callback){
  todo.find({}, callback);
}

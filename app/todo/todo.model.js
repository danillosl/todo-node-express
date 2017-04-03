const mongoose = require('mongoose');
var idPlugin = require('mongoose-id');

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

TodoSchema.plugin(idPlugin);

const todo = module.exports = mongoose.model('todoModel', TodoSchema);

module.exports.findAll = function (callback) {
  todo.find({}, callback);
}

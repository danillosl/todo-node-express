const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const properties = require('./app/app.properties');

// routes
const todo = require('./app/todo/todo.route');

// connection to mongo
mongoose.connect(properties.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + properties.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});


const app = express();

app.use(bodyParser.json());

app.use(cors());


app.use(properties.apiVersion  + '/todos' ,todo);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

const port = process.env.PORT || 8080;
// Start Server
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

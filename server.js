const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')


const todos = [
  {
    id:1,
    name:"eat"
  },
  {
    id:2,
    name:"sleep"
  },
  {
    id:3,
    name:"repeat"
  },
]

let currentId = 3;

app.get('/', function(req,res) {
  res.render("index")
})

app.get('/todos', function(req, res) {
  res.send({todos:todos});
})

app.post('/todos', function(req, res) {
  let todoName = req.body.name;
  currentId++;

  todos.push({
    id: currentId,
    name: todoName
  })
  res.send("Succesfully Created todo");
})

app.put('/todos/:id', function(req,res) {
  let id = req.params.id;
  let newName = req.body.newName;
  let found = false;
  todos.forEach(function(todo, index) {
    if(!found && todo.id === Number(id)) {
      todo.name = newName;
    }
  })
  res.send("Succesfully updated")
})

app.delete('/todos/:id', function(req, res) {
  const id = req.params.id;

  const found = false;

  todos.forEach(function(todo, index) {
    if(!found && todo.id === Number(id)) {
      todos.splice(index,1);
    }
  })
  res.send("sucessfully deleted")
})

app.listen(3000, function() {
  console.log("He hears you 0.0 ")
})

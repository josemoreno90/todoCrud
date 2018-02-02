const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')


const products = [
  {
    id:1,
    name:"laptop"
  },
  {
    id:2,
    name:"cherries"
  },
  {
    id:3,
    name:"rabbit"
  },
]

let currentId = 3;

app.get('/', function(req,res) {
  res.render("index")
})

app.get('/products', function(req, res) {
  res.send({products:products});
})

app.post('/products', function(req, res) {
  let productName = req.body.name;
  currentId++;

  products.push({
    id: currentId,
    name: productName
  })
  res.send("Succesfully Created Product");
})

app.put('/products/:id', function(req,res) {
  let id = req.params.id;
  let newName = req.body.newName;
  let found = false;
  products.forEach(function(product, index) {
    if(!found && product.id === Number(id)) {
      product.name = newName;
    }
  })
  res.send("Succesfully updated")
})

app.delete('/products/:id', function(req, res) {
  const id = req.params.id;

  const found = false;

  products.forEach(function(product, index) {
    if(!found && product.id === Number(id)) {
      products.splice(index,1);
    }
  })
  res.send("sucessfully deleted")
})

app.listen(3000, function() {
  console.log("He hears you 0.0 ")
})

const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended: true}));

const list = [{
    todo: "cut the grass",
    yetTodo: true
}, {
    todo: "water the plants",
    yetTodo: false
}];

const data = {
    list:list
};

app.get('/', function(req, res) {
    res.render('index', data);
});


app.post('/', function(req, res) {
    list.push({todo:req.body.text, yetTodo:true});
    res.render('index',data);
});

app.post('/complete', function(req,res){
    console.log(req.body);
    let completed = req.body.cpmplete;
    function findTodo(item){
      return item.todo === completed;
    }
    console.log(list.find(findTodo));
    list.find(findTodo).yetTodo = false;
    res.redirect('/');
});

app.listen(3000, function() {
    console.log("Server is running on port 3000")
});

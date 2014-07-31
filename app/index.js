'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('dice');
});

app.get('/rolldice/:roll', function(req, res){
  var roll = req.params.roll * 1;
  var row = Math.ceil(roll / 10);
  var rolls = [];

  for(var i = 0; i < roll; i++){
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  var sum = rolls.reduce(function(a,b){return a + b;});
    res.render('rolldice', {rolls:rolls,row:row,sum:sum});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});

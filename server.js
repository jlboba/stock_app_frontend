var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

app.use(express.static('public'));


var loginController = require('./controllers/logincontroller.js');
app.use('/login', loginController);


app.listen(port, function() {
  console.log('=======================');
  console.log('Running on port ' + port);
  console.log('=======================');
});

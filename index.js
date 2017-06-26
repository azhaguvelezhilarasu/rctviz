var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.send('this is home page');
});
app.get('/contacts',function(req,res){
	res.send('this is contacts page');
});
app.listen(8000);

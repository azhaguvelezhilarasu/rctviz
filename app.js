var express = require('express');
var app = express();
var titanConn = require('./utils/titanconnection');
app.use('/styles', express.static('styles'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');
app.get('/',function(req,res){
	titanConn.incidentCount('Card-',function(values){
	        res.render('index',{page: 'CARD', populate: values});
	});
});
app.get('/card',function(req,res){
	titanConn.incidentCount('Card-',function(values){
	        res.render('index',{page: 'CARD', populate: values});
	});
});
app.get('/pillar',function(req,res){
	titanConn.incidentCount('Pillar-',function(values){
	        res.render('index',{page: 'PILLAR', populate: values});
	});
});
app.get('/chassis',function(req,res){
	titanConn.incidentCount('Chassis-',function(values){
	        res.render('index',{page: 'CHASSIS', populate: values});
	});
});
app.get('/cable',function(req,res){
	titanConn.incidentCount('Cable-',function(values){
	        res.render('index',{page: 'CABLE', populate: values});
	});
});
app.get('/graph/:name',function(req,res){
var data= [{source: "Cable-000000002200683859", target: "Duct-000000002200684306", type: "connected"},{source: "Cable-000000002200683858", target: "Duct-000000002200684284", type: "connected"},{source: "Cable-000000002200683883", target: "Duct-000000002200684284", type: "connected"}];
	res.render('graph',{data: data});
	console.log(req.params.name);
});
app.get('/map',function(req,res){
 res.render('map');
});
app.listen(8000);

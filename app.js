var express = require('express');
var app = express();
var titanConn = require('./utils/titanconnection');
app.use('/styles', express.static('styles'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');
app.get('/',function(req,res){
	        res.render('landingpage');
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
	titanConn.reset();
	        var found=[];
        var links=[];
        var find=[];
        var linksgeo=[];
	titanConn.inventoryStructure(req.params.name,function(links,linksgeo){var data=JSON.parse("[{"+links.join("},{")+"}]");res.render('graph',{data: data,geo: linksgeo,name: req.params.name});},found,links,find,linksgeo);
});
app.get('/map',function(req,res){
	titanConn.incidentMap(function(geo){res.render('map',{geo: geo});});
});
app.get('/incident',function(req,res){
	titanConn.incidentView(function(data){res.render('incident',{data: data});});
});
app.listen(80);

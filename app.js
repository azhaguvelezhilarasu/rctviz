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
	        var found=[];
        var links=[];
        var find=[];
        var linksgeo=[];
//inventoryStructure('Card-2MAN-01-023-VLC-0001',function(data,links){console.log("final data");console.log(data);console.log("[{"+links.join("},{")+"}]");},found,links,find,linksgeo);
	titanConn.inventoryStructure(req.params.name,function(data,links){var data=JSON.parse("[{"+links.join("},{")+"}]");res.render('graph',{data: data});},found,links,find,linksgeo);
//	data=JSON.parse(data);
//	res.render('graph',{data: data});
});
app.get('/map',function(req,res){
 res.render('map');
});
app.listen(8000);

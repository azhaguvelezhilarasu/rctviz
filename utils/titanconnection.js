var grex = require('grex');
var client = grex.createClient({host: '192.168.92.128',port: 8182,graph: 'graph'});
var gremlin = grex.gremlin;
var parallellimit=100;
var parallel=2;
module.exports.reset=function(){
	parallel=2;
};
module.exports.incidentCount=function (name, callback){
        console.log(name);
        iquery="g.V('type','CopperElement').filter{it.name.matches('.*"+ name  +".*')}.groupBy{it.name}{it.in.has('type','SID').map}{it.size()}.cap";
	console.log(iquery);
        var query = gremlin(iquery);
        client.execute(query, function(err, response) {
        	var values = JSON.parse(JSON.stringify(response.results).replace('[','').replace(']',''));
                for(var exKey in values) {
                	if(values[exKey]>0){
                        	console.log("key:"+exKey+", value:"+values[exKey]);
                                                                                                                                                                                                                     }
        	}
		callback(values);
	});
};

module.exports.incidentMap=function (callback){
	var geo=[];
        iquery="g.V('type','CopperElement').filter{it.in.has('type','SID').asBoolean() && it.has('geo').asBoolean()}.transform{[it.name,it.geo]}";
        var query = gremlin(iquery);
        client.execute(query, function(err, response) {
		console.log(JSON.stringify(response.results));
        	var values = JSON.parse(JSON.stringify(response.results));
                for(var exKey in values) {
                       	console.log("key:"+exKey+", value:"+values[exKey][0]);
			var valueToPush = new Array();
                        valueToPush.push(values[exKey][0]);
                        for(var key in values[exKey][1]) {
                        	console.log("value:"+values[exKey][1][key]+" :" + key);
                        	valueToPush.push(parseFloat(values[exKey][1][key]));
                        }
			geo.push(valueToPush);
        	}
		console.log(geo);
		callback(geo);
	});
};

module.exports.incidentView=function (callback){
        iquery="g.V('type','SID').filter{it.out.hasNext()}.transform{[it.name,it.out.name.collect()]}";
        var query = gremlin(iquery);
        client.execute(query, function(err, response) {
		console.log(JSON.stringify(response.results));
        	var values = JSON.parse(JSON.stringify(response.results));
		callback(values);
	});
};

module.exports.inventoryStructure=function(name,callback,found,links,find,linksgeo){
        	console.log(name);
		found.push(name);
		iquery="g.V('name','"+name+"').in.hasNot('type','SID').transform{[it.name,it.geo]}"
		console.log(iquery);
        	var query = gremlin(iquery);
        	client.execute(query, function(err, response) {
        		var values = JSON.parse(JSON.stringify(response.results));
			if(values){
                		for(var exKey in values) {
					var link="\"source\": \""+ values[exKey][0] +"\", \"target\": \""+ name +"\", \"type\": \"connected\"";
					if(links.indexOf(link)<0){
						links.push(link);
					}
					if(found.indexOf(values[exKey][0])<0){
						find.push(values[exKey][0]);
                        			if(values[exKey][1]){
							var valueToPush = new Array();
							valueToPush.push(values[exKey][0]);
							for(var key in values[exKey][1]) {
								console.log("value:"+values[exKey][1][key]+" :" + key);
								valueToPush.push(parseFloat(values[exKey][1][key]));	
							}
							linksgeo.push(valueToPush);
						}
					}
					
		//			console.log("value:"+values[exKey][0]+" "+"value:"+values[exKey][1]);
					
        			}
        		}
			parallel--;
       		 while(parallel<parallellimit){
                	if(find.length>0){
                		parallel+=2;
                        	module.exports.inventoryStructure(find.pop(),callback,found,links,find,linksgeo);
                	}
			else{
				break;
			}
        	 }
                                if(parallel==0){
					console.log(linksgeo);
                                        callback(links,linksgeo);
                                }

		});



                        iquery="g.V('name','"+name+"').out.hasNot('type','SID').transform{[it.name,it.geo]}"
                        //console.log(iquery);
                        query = gremlin(iquery);
                        client.execute(query, function(err, response) {
                                var values = JSON.parse(JSON.stringify(response.results));
                                if(values){
                                        for(var exKey in values) {
						var link="\"source\": \""+ name +"\", \"target\": \""+ values[exKey][0] +"\", \"type\": \"connected\"";
					        if(links.indexOf(link)<0){
                                                	links.push(link);
                                        	}
                                                if(found.indexOf(values[exKey][0])<0){
                                                        //console.log("Not found");
                                                        find.push(values[exKey][0]);
                        				if(values[exKey][1]){
								var valueToPush = new Array();
								valueToPush.push(values[exKey][0]);
								for(var key in values[exKey][1]) {
									console.log("value:"+values[exKey][1][key]+" :" + key);
									valueToPush.push(parseFloat(values[exKey][1][key]));	
								}
								linksgeo.push(valueToPush);
							}
                                                }
                                                if(values[exKey][1]){
							for(var key in values[exKey][1]) {
								console.log("value:"+values[exKey][1][key]+" :" + key);
							}
                                                }
                                           //     console.log("value:"+values[exKey][0]+" "+"value:"+values[exKey][1]);
                                        }
                                }
                             //   console.log(find);
                              //  console.log(found);
                                console.log(find.length);
                                console.log(found.length);
                                console.log(parallel);
                                parallel--;
                                while(parallel<parallellimit){
                                        if(find.length>0){
                                        	parallel+=2;
                                                module.exports.inventoryStructure(find.pop(),callback,found,links,find,linksgeo);
                                        }
					else{
						break;
					}
                                }
				if(parallel==0){
					console.log(linksgeo);
					callback(links,linksgeo);
				}
                        });

};
//module.exports.incidentMap(function(value){});
//module.exports.incidentView(function(value){console.log(value)});
//	var found=[];
//	var links=[];
//	var find=[];
//	var linksgeo=[];
//module.exports.inventoryStructure('Cable-000000006500976854',function(links,linksgeo){console.log("final data");console.log(linksgeo);console.log("[{"+links.join("},{")+"}]");},found,links,find,linksgeo);
//inventoryStructure('Pillar-184401780138867398',function(data){console.log("final data");console.log(data);});

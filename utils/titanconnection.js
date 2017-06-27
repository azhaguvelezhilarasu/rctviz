var grex = require('grex');
var client = grex.createClient({host: 'svapm0000006np',port: 8182,graph: 'graph'});
var gremlin = grex.gremlin;
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
	var found=[];
	var links=[];
	var find=[];
	var linksgeo=[];
	var parallellimit=100;
	var parallel=2;
//module.exports.inventoryStructure=function (name){
function inventoryStructure(name,callback){
        	console.log(name);
		found.push(name);
		iquery="g.V('name','"+name+"').in.hasNot('type','SID').transform{[it.name,it.geo]}"
		console.log(iquery);
        	var query = gremlin(iquery);
        	client.execute(query, function(err, response) {
        		var values = JSON.parse(JSON.stringify(response.results));
			if(values){
                		for(var exKey in values) {
					if(found.indexOf(values[exKey][0])<0){
			//			console.log("Not found");
						find.push(values[exKey][0]);
			//			console.log(find);
					}
                       // 		if(!values[exKey][1]){
						//console.log("value:"+values[exKey][0]+" empty");
					//}
		//			console.log("value:"+values[exKey][0]+" "+"value:"+values[exKey][1]);
					
        			}
        		}
			parallel--;
       		 while(parallel<parallellimit){
                	if(find.length>0){
                        	inventoryStructure(find.pop(),callback);
                		parallel+=2;
                	}
			else{
				break;
			}
        	 }
                                if(parallel==0){
                                        callback(found);
                                }

		});



                        iquery="g.V('name','"+name+"').out.hasNot('type','SID').transform{[it.name,it.geo]}"
                        console.log(iquery);
                        query = gremlin(iquery);
                        client.execute(query, function(err, response) {
                                var values = JSON.parse(JSON.stringify(response.results));
                                if(values){
                                        for(var exKey in values) {
                                                if(found.indexOf(values[exKey][0])<0){
                                                        //console.log("Not found");
                                                        find.push(values[exKey][0]);
                                                        //console.log(find);
                                                }
                                                if(!values[exKey][1]){
                                                       // console.log("value:"+values[exKey][0]+" empty");
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
                                                inventoryStructure(find.pop(),callback);
                                        	parallel+=2;
                                        }
					else{
						break;
					}
                                }
				if(parallel==0){
					callback(found);
				}
                        });

};

//inventoryStructure('Pillar-160101670796979402',function(data){console.log("final data");console.log(data);});
inventoryStructure('Pillar-184401780138867398',function(data){console.log("final data");console.log(data);});

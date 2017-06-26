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

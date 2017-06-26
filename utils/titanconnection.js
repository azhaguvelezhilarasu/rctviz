var grex = require('grex');
var client = grex.createClient({host: 'svapm0000006np',port: 8182,graph: 'graph'});
var gremlin = grex.gremlin;
var query = gremlin('g.V.map');
client.execute(query, function(err, response){
	console.log(response);
});

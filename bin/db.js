/*
var mysql	= require('mysql');
var connection = mysql.createConnection({
	host: 'schedule.cpfi2ocm03x0.us-west-2.rds.amazonaws.com',
	user: 'joseph',
	password: 'joseph123'
});
connection.connect();


var DB = {
	find: (options) => {
		var _vals = [];
		var _queryString = [
			"SELECT",
			(options.fields?options.fields:"*"),
			"FROM",
			options.from,
			"WHERE",
			options.query.map((comps) => {
				return "(" + comps.map((comp) => {
					_vals.push(comp[2]);
					return [comp[0],comp[1],"?"].join(" ");
				}).join(" AND ") + ")";
			}).join(' OR ')
		].join(" ");
		
		return new Promise(function(resolve,reject){
			console.log("Query: "+_queryString);
			connection.query(_queryString,_vals,function(e,d){
				if(e)
					reject(e);
				else
					resolve(d);
			});
		})
	},
	query: () => {
		connection.query.apply(null,arguments);
	}
}


module.exports = DB;


















*/

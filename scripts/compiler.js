var ClosureCompiler = require("closurecompiler");
var platform = process.platform;
var exec = require('child_process').exec;
var fs = require('fs');

var files = [];

if(platform == 'win32'){
	exec('forfiles /s /m *final.min.js /c "cmd /c echo @relpath"', function(e, stdout, stderr){
		compile(stdout.replace(/\\/g,'/').replace(/\"/g,"").split('\r\n'));
	});
}
else if(platform == 'linux'){
	exec('find -type f -name "*final.min.js"', function(e, stdout, stderr){
		compile(stdout.split('\n'));
	});
}



function compile(arr){
	arr = arr.filter((i) => (i&&(i.indexOf('ERROR') == -1)));
	arr = arr.map((file) => ('.'+file));
	arr.forEach(function(files){

		var assets = require(files).map(function(file){
			return './assets/' + file;
		});
		console.log(assets)

		ClosureCompiler.compile(assets,{compilation_level: "ADVANCED_OPTIMIZATIONS"},
		(error, result) => {
	        if (result) {
	        	fs.writeFile(files,result,function(err){

	        	});
	        } else {

	        }
	    });
	});
	console.log(arr);
}	
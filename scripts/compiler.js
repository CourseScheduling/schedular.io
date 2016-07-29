var ClosureCompiler = require("closurecompiler");
var platform = process.platform;
var exec = require('child_process').exec;

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
	console.log(arr)
	arr.forEach(function(files){

		var assets = require(files).map(function(file){
			return './assets/' + file;
		});
		console.log(assets)

		ClosureCompiler.compile(
			assets,
    {
        // Options in the API exclude the "--" prefix 
        compilation_level: "ADVANCED_OPTIMIZATIONS",
    },
    function(error, result) {
        if (result) {
        	console.log(result);
        } else {
            // Display error... 
         }
    }
);
	});
	console.log(arr);
}	
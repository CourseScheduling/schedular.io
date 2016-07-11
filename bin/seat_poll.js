var ajax = require('./Ajax.js');

'http://ufv.ca/arfiles/Banner_Size_Sect_CR.txt'

// Returns the lines of data.
b.split('\n').filter(function(line){
 return line.substr(0,6).match(/\d{5}/)
});
const util = require('util');
const fs = require('fs');



const _readfile = util.promisify(fs.readFile);
const readFile = fileName => _readfile(fileName,'utf8')
								.then(data => JSON.parse(data));

const _writeFile = util.promisify(fs.writeFile)
const writeFile = (fileName,data)  =>
					 _writeFile(fileName,JSON.stringify(data));


module.exports = {
    readFile,
    writeFile
};	 
const path = require('path');
const fs = require('fs-extra');
const cucumberJsonDir = path.resolve(process.cwd(), 'Reports-json');

function removeCypressJson_Directory(){
    fs.rmdirSync(cucumberJsonDir,{ recursive: true });
}

removeCypressJson_Directory();


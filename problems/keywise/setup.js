var level = require('level');
var os = require('os');
var path = require('path');
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var dba = path.join(os.tmpDir(), 'keywise-' + Math.random() + '.db');
    var dbb = path.join(os.tmpDir(), 'keywise-' + Math.random() + '.db');
    var datafile = path.join(__dirname, 'data.json');
    
    return {
        submissionArgs: [ dba, datafile ],
        solutionArgs: [ dbb, datafile ],
        a: check(afile),
        b: check(bfile)
    };
};

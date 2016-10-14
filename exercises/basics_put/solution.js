var level = require('level')

module.exports = function (databaseDir, obj, callback) {
	var db = level(databaseDir)

	for (var key in obj) {
	  db.put(key, obj[key])
	}
	db.close(callback)
}
var fs = require('fs');
var path = require('path');


var addTagToFile = function(oldPath, tag, side, cb) {

	var filePath = path.dirname(oldPath);
	var extension = path.extname(oldPath);
	var filename = path.basename(oldPath,extension);

	if (side == 'left') {
		var newPath = filePath + '/' + tag + ' ' + filename + extension;
		fs.rename(oldPath, newPath, function(err) {
			if (err) return cb(err);
		});
	}

	if (side == 'right') {
		var newPath = filePath + '/' + filename + ' ' + tag + extension;
		fs.rename(oldPath, newPath, function(err) {
			if (err) return cb(err);
		});
	}

};


var parallelRead = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			file = path.resolve(dir, file);
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					parallelRead(file, function(err, res) {
						results = results.concat(res);
						if (!--pending) done(null, results);
					});
				} else {
					results.push(file);
					if (!--pending) done(null, results);
				}
			});
		});
	});
};


module.exports.addTag = function(dir, tag, side, cb) {
	parallelRead(dir, function(err, data) {
		if (err) return cb(err);
		data.forEach(function(filePath) {
			addTagToFile(filePath, tag, side, function(err) {
				if (err) return cb(err);
			}); // End addTag.
		}); // End forEach.
		return cb(err);
	}); // End parallel read.
};


module.exports.removeTag = function(dir, tag, cb) {
	parallelRead(dir, function(err, data) { // Start parallel read.
		if (err) return cb(err);
		data.forEach(function(oldPath) { // Start forEach.
			var newPath = oldPath.replace(tag, '');
			fs.rename(oldPath, newPath, function(err) {
				if (err) return cb(err);
			});		
		}); // End forEach.
		return cb(err);
	}); // End parallel read.	
};

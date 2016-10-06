var expect    = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');
var rmdir = require('rmdir');
var generator = require('../lib/generator');


describe('Generator', function() {

	beforeEach(function(done) {
		done();
	});

	afterEach(function(done) {
		done();
	});

	it('Add tag to the file name on the left side.', function(done) {
		var dir = 'tmp';
		var tag = '[tag]';
		var side = 'left';
		var originalFileArray = [];
		// Create the tmp folder and files:
		fs.mkdirSync(dir);
		for (var i=0; i<3; i++) {
			var file = dir + '//test' + i + '.txt';
			var data = 'Hello World!';
			fs.writeFileSync(file, data);
			originalFileArray.push(tag + ' ' + 'test' + i + '.txt');
		}

		var result = generator.addTag(dir, tag, side, function(err) {
			if (err) return done(err);
			// Get result files:
			var finalArray = fs.readdirSync(dir);
			expect(finalArray).to.deep.equal(originalFileArray);
			// Remove tmp folder and files:
			rmdir(dir, function(err) {
				if (err) console.log(err);
				done();
			}); // Remove dir.
		}); // End add tag.
	});


	it('Add tag to file name on the right side.', function(done) {
		var dir = 'tmp';
		var tag = '[tag]';
		var side = 'right';
		var originalFileArray = [];
		// Create the tmp folder and files:
		fs.mkdirSync(dir);
		for (var i=0; i<3; i++) {
			var file = dir + '//test' + i + '.txt';
			var data = 'Hello World!';
			fs.writeFileSync(file, data);
			originalFileArray.push('test' + i + ' ' + tag + '.txt');
		}

		var result = generator.addTag(dir, tag, side, function(err) {
			if (err) return done(err);
			// Get result files:
			var finalArray = fs.readdirSync(dir);
			expect(finalArray).to.deep.equal(originalFileArray);
			// Remove tmp folder and files:
			rmdir(dir, function(err) {
				if (err) console.log(err);
				done();
			}); // Remove dir.
		}); // End add tag.
	});


	it('Remove tag from file name.', function(done) {

		var dir = 'tmp';
		var tag = ' [tag]';
		var originalFileArray = [];

		// Create the tmp folder and files:
		fs.mkdirSync(dir);
		for (var i=0; i<3; i++) {
			var file = dir + '//test' + i + tag + '.txt';
			var data = 'Hello World!';
			fs.writeFileSync(file, data);
			originalFileArray.push('test' + i + '.txt');
		}

		// Remove the tag from file name and check the result:
		var result = generator.removeTag(dir, tag, function(err) { // Start remove tag.
			if (err) return done(err);

			var finalArray = fs.readdirSync(dir);
			expect(finalArray).to.deep.equal(originalFileArray);

			rmdir(dir, function(err) { // Start remove dir.
				if (err) console.log(err);
				done();
			}); // End remove dir.
		}); // End remove tag.
	});

});

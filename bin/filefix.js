#!/usr/bin/env node

var program = require("commander");
var generator = require("../lib/generator");

program
.version("1.0.0")
.option("-p, --path <path>", "Path to the files directory.")
.option("-t, --tag <tag>", "Tag to add into the file name.")
.option("-l, --localization <localization>", "Tag's localization [left, right].");

program.command("add")
.description("Adds a specific tag to the file name.")
.action(function() {
	if (!checkOptions(program)) return;
	generator.addTag(program.path, program.tag, program.localization, function(err) {
		if (err) console.log(err);
		else console.log("Files successfully tagged.");
	});		
});

program.command("remove")
.description("Removes a specific tag from the file name.")
.action(function() {
	generator.removeTag(program.path, program.tag, function(err) {
		if (err) console.log(err);
		else console.log("Tag successfully removed from files.");
	});	
});

program.parse(process.argv);


function checkOptions(program) {
	if (!program.path) {
		console.log("Path not specified.");		
		return false;
	} else if (!program.tag) {
		console.log("Tag not specified.");		
		return false;
	} else if (!program.localization) {
		console.log("Localization not specified, choose right or left.");
		return false;
	} else {
		return true;
	}
}

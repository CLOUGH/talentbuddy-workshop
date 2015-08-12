#!/usr/bin/env node
var Command = require('./command');
Command.executeCurrentOperation(function(err,data) {
	if (err) {
		console.log('Error!');
	} else {
		console.log('Ok! The command ran succesfully!');
		if(typeof data!='undefined'){
			console.log(data);
		}
	}
});
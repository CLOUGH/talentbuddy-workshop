var jsonfile = require('jsonfile');
var Util = require('./util');

var Contact = {};

Contact.parseName = function(str) {
	// str i a string containing the name and phone number separated by comma
	// extract and return the name from the str argument
	// str will always contain only one comma character
	return str.split(',')[0].trim();
};

Contact.parseNumber = function(str) {
	// str us a string containing the name and phone number separeted by comma
	// extract and return the number from the argument
	// str will always contain only one comma character
	return str.split(',')[1].trim();
};

Contact.createContact = function(str) {
	// str is a string containing the name and phone number separated by comma
	// str will always contain only one comma character
	// return the JavaScript Object with properties name and number
	return {
		name: this.parseName(str),
		number: this.parseNumber(str)
	};
};

Contact.loadContacts = function(done) {
	// read data.json using jsonfile.readFile
	// call done(err, data)	
	jsonfile.readFile(Util.getDataPath(), function(err, data) {
		done(err, data);
	});
};

Contact.saveContacts = function(contacts, done) {
	// contacts is a Javascript array containing contact objects
	// you need to write the contacts array to data.json and 
	// call done(err) when the write operation is complete
	jsonfile.writeFile(Util.getDataPath(), contacts, done);
};

Contact.saveContact = function(contact, done) {
	// contact is a JavaScript object containing the contact info
	// e.g. { name: 'John Smith', number: '604-123-9090' }
	//
	// you need to load the contacts array from `data.json`
	// append the new contact to it
	// store the contacts array to `data.json`
	// call done(err) when the operation is complete
	// err is the value of the error (null if no error was encountered)
	var _this = this;
	this.loadContacts(function(err, contacts) {
		if (err) {
			return done(err);
		}
		contacts.push(contact);
		_this.saveContacts(contacts, done);
	});
};

Contact.findContacts = function(name, done) {
	// name is a string value like "John Smith"
	// 
	// you need to load the contacts array from 'data.json'
	// search the ones matching the given name
	// and return them as an array of contacts via the done callback
	// e.g. done (err, foundContacts)
	// where foundContacts is the array of tcontacts that matched the search
	// err is the value for the error (null if no erro was encountered)
	this.loadContacts(function(err, contacts) {
		if (err) {
			return done(err, 'error');
		}

		var filteredContacts = contacts.filter(function(contact) {
			return contact.name == name;
		});

		done(null, filteredContacts);
	});
};

module.exports = Contact;
var Contact = require('./contact');
var Command = {};

Command.getOperation = function() {
	// return the value fromt the list of command line arguments
	// representing the operation to be performed (add or find)
	return process.argv[2];
};

Command.getOperationData = function() {
	// return the value from the list of command line arguments
	// representing the data to be used for the operation
	return process.argv[3];
};

Command.add = function(done) {
	// extracts the contact string from the command line arguments
	// converts the contact string into a contact object using Contact.createContact
	// appends the contact object to data.json
	// calls the callback done(err)
	// err represnts the erro which will be null if no errors were encountered
	var contact = Contact.createContact(this.getOperationData());
	Contact.saveContact(contact, done);
};

Command.find = function(done) {
	// extracts the name from the command line arguments e.g. "John Smith"
	// searches for the contacts matching the given name using Contact.findContacts
	// prints the matched contacts
	// return the matched contacts array via done callback
	// e.g. done(err, foundContacts)
	// where foundContacts is the array of contacts that matched the search
	// err is the value for the rro (null if no erro was encountered)
	var name = this.getOperationData();
	Contact.findContacts(name, function(err, contacts) {
		if (err) {
			return done(err, null);
		}

		done(null, contacts);
	});
};

Command.executeCurrentOperation = function(done){
	var operation = this.getOperation();
	var command = Command[operation] || function(done){
		done('Invalid command.');
	}

	command.bind(this)(done);
}

module.exports = Command;
var cipher = require('./index'); // use as CommonJS, AMD, ES6 module or via window.openpgp
var sleep = require('sleep');
var keys = require("./keys.json");
var passphrase='super long and hard to guess secret' ;

cipher.encryptData("this is test ", console.log, keys.pubkey, function(err, encryptData) {
	if (err) {
		return	console.log(err);
	}
	cipher.decryptData(encryptData, console.log, keys.privkey, passphrase, function(err, plainText) {
		if (err) {
			return	console.log(err);
		}
		console.log(plainText);
	});
});


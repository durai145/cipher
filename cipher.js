var openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
var sleep = require('sleep');
var keys = require("./keys.json");

function encryptData(plaintext, logdebug, key, callback) {
        var options = {
            data: plaintext,                             // input as String (or Uint8Array)
            publicKeys: openpgp.key.readArmored(key).keys//,  // for encryption
//          privateKeys: privKeyObj // for signing (optional)
        }
        logdebug("call openpgp.encrypt");
        openpgp.encrypt(options).then(function(ciphertext) {
                logdebug("encrypted=" + ciphertext);
                return callback(null, ciphertext.data);
        });
}
/*
function decryptData(plaintext, logdebug, key, callback) {
        var options = {
            data: plaintext,                             // input as String (or Uint8Array)
            publicKeys: openpgp.key.readArmored(key).keys//,  // for encryption
//          privateKeys: privKeyObj // for signing (optional)
        }
        logdebug("call openpgp.encrypt");
        openpgp.decrypt(options).then(function(ciphertext) {
                logdebug("encrypted=" + ciphertext);
                return callback(null, ciphertext.data);
        });
}
*/

decryptData=function(chipertext,log, privkey, callback) {
        var passphrase='super long and hard to guess secret' ;
        var privKeyObj = openpgp.key.readArmored(keys.privkey).keys[0];
        privKeyObj.decrypt(passphrase);
        var options = {
            message: openpgp.message.readArmored(chipertext),     // parse armored message
            publicKeys: openpgp.key.readArmored(privkey).keys,    // for verification (optional)
            privateKey: privKeyObj // for decryption
        };

//	console.log(JSON.stringify(options));

        openpgp.decrypt(options).then(function(plaintext) {
                log(plaintext);
            callback(null, plaintext.data); // 'Hello, World!'
        });
}



encryptData("this is test ", console.log, keys.pubkey, function(err, encryptData) {
	if (err) {
		return	console.log(err);
	}
	console.log(encryptData);
	console.log("call decrypt ...");
	decryptData(encryptData, console.log, keys.privkey, function(err, plainText) {
		if (err) {
			return	console.log(err);
		}
		console.log(plainText);
	});
});


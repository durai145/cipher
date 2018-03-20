var openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
function encryptData(plaintext, log, key, callback) {
	log("in encrypt");
        var options = {
            data: plaintext,                             // input as String (or Uint8Array)
            publicKeys: openpgp.key.readArmored(key).keys//,  // for encryption
        }
        openpgp.encrypt(options).then(function(ciphertext) {
		log("in encrypt callback");
                return callback(null, ciphertext.data);
        });
}

decryptData=function(chipertext,log, privkey, password, callback) {
	log("in decryptData");
        var privKeyObj = openpgp.key.readArmored(privkey).keys[0];
        privKeyObj.decrypt(password);
        options = {
            message: openpgp.message.readArmored(chipertext),     // parse armored message
            publicKeys: openpgp.key.readArmored(privkey).keys,    // for verification (optional)
            privateKey: privKeyObj // for decryption
        };

        openpgp.decrypt(options).then(function(plaintext) {
		log("in decryptData");
				return callback(null, plaintext.data); // 'Hello, World!'
        });
}

exports.decryptData=decryptData;
exports.encryptData=encryptData;

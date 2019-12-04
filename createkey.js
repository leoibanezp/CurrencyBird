
var sodium = require('sodium').api;
var fs = require('fs');

var sender = sodium.crypto_box_keypair()


var secretKey = sender.secretKey.toString('ascii')
var publicKey = sender.publicKey.toString('ascii')


fs.writeFile("./keys/secretKey.key", secretKey, function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

fs.writeFile("./keys/publicKey.key", publicKey, function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
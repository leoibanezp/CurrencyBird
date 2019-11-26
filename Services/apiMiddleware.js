const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var Verify = require('../lib/verify.js');
var app = express();
app.use(bodyParser.json());
const options = {
    pubkey: fs.readFileSync("./keys/pubkey.pem")
};

app.use(function (req, res, next) {
    let pubkey = options.pubkey.toString('ascii')
    if (req.headers.authorization !== undefined) {
        const message = req.body
        const signedMessage = req.headers.authorization
        const isValid = Verify.getSignatureVerify(message, signedMessage, pubkey)

        if (isValid) {
            next();
        } else {
            res.status(409).send('The signature of the header does not match the public key');
        }
    } else {
        res.status(409).send('The signature of the header is invalid');
    }
});
module.exports = app;

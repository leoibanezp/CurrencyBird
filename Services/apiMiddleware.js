const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var Verify = require('../lib/verify.js');
var app = express();
app.use(bodyParser.json());
const options = {
    api_secretKey: Buffer.from(fs.readFileSync("./keys/api_secret.key")),
    client_publicKey: Buffer.from(fs.readFileSync("./keys/client_public.key")),
};

app.use(function (req, res, next) {
    console.log('API Request')
    if (req.headers.validation !== undefined) {
        const message = req.body
        const validation = JSON.parse(req.headers.validation)
        const isValid = Verify.getSignatureVerify(message, validation.signedMessage, validation.nonce, options.client_publicKey, options.api_secretKey)

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

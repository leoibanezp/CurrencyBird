var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var Verify = require('./lib/verify.js');
var Payment = require('./Services/payment.js');
app.use(bodyParser.json());

const options = {
    pubkey: fs.readFileSync("./keys/pubkey.pem")
};

app.post('/Payment', async function (req, res) {
    let pubkey = options.pubkey.toString('ascii')
    let result = {}
    if (req.headers.authorization !== undefined) {
        const message = req.body
        const signedMessage = req.headers.authorization
        const isValid = Verify.getSignatureVerify(message, signedMessage, pubkey)
        if (isValid) {
            result = await Payment.Invoke(message.id)
        }
    }
    res.send(JSON.stringify(result.data));
  });

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
var crypto = require('crypto');
var sodium = require('sodium').api;

module.exports.getSignatureVerify = function  getSignatureVerify(message, signedMessage, nonce, publicKey, secretKey) {

    var hash = crypto.createHash('sha256');

    const signatureBuf = new Buffer.from(signedMessage)

    const nonceBuf = new Buffer.from(nonce)

    let inputHash = hash.update(JSON.stringify(message)).digest('hex');

    var plainBuffer = sodium.crypto_box_open(signatureBuf, nonceBuf, publicKey, secretKey);

    if (plainBuffer == null) {
        return false
    }

    return plainBuffer.toString() == inputHash
};



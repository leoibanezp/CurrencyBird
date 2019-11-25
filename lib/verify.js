var crypto = require('crypto');

module.exports.getSignatureVerify = function  getSignatureVerify(message, signedMessage, publicKey) {
    const verifier = crypto.createVerify('RSA-SHA256')
    var hash = crypto.createHash('sha256');

    let inputHash = hash.update(JSON.stringify(message)).digest('hex');

    verifier.update(inputHash, 'ascii')

    const publicKeyBuf = new Buffer.from(publicKey, 'ascii')
    const signatureBuf = new Buffer.from(signedMessage, 'hex')
    const result = verifier.verify(publicKeyBuf, signatureBuf)

    return result;
};



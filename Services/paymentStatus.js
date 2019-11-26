const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

router.post('/PaymentStatus', async function (req, res) {
    const message = req.body
    const result = await axios.get(`https://virtserver.swaggerhub.com/currencybird4/CBird/1.0.0/PaymentStatus/${message.id}`)
    res.send(JSON.stringify(result.data));
});

module.exports = router;

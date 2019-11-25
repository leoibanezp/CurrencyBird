const axios = require('axios');

module.exports.Invoke = async function Invoke(id) {
    return await axios.get(`https://virtserver.swaggerhub.com/currencybird4/CBird/1.0.0/Payment/${id}`);
};

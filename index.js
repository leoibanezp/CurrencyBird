var express = require('express');
var app = express();
var apiMiddleware = require('./Services/apiMiddleware');
var paymentRouter = require('./Services/payment');
var paymentStatusRouter = require('./Services/paymentStatus');

app.use('/', apiMiddleware);
app.post('/Payment', paymentRouter);
app.post('/PaymentStatus', paymentStatusRouter);

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

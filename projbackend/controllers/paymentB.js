var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "ntbddhghg3m5qpfz",
  publicKey: "77vgc8b4stkg9dn2",
  privateKey: "ad10d8cfa470797b7ec59f45209772ab"
});

exports.getToken = (req,res)=>{
    gateway.clientToken.generate({
        
    }, function(err,response){
         if(err){
             res.status(500).send(err)
         }
         else{
             res.send(response)
         }
    });
}

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};

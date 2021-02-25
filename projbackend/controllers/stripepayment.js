const stripe = require("stripe")("sk_test_51Hl6jrGGwQgRcO1cFbZLM6T0DwQR7o5hXnTCx6yIrbhBIL0n37mUwjFtCzxN6K7Ft6MHADPWpH2JxY6AsWCgIQQg00nHT3KKK2");
const { v4: uuidv4 } = require('uuid');

exports.makepayment = (req, res) => 
{
  const { products, token } = req.body;
  console.log("PRODUCTS", products);
  
  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "A test account...",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },
          {
            idempotencyKey
          }
        )
        .then(result => res.status(200).json(
          {
           message:"Charged successfully..."
          }
        ))
        .catch(err => console.log(err));
    })
    
};

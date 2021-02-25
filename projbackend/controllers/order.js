const {Order, ProductCart }=require("../models/order");

//find by id//
exports.getOrderById=(req,res,next,id)=>
{
Order.findById(id)
.populate("products.product","name price")
.exec((err,order)=>
{
    if(err)
    {
      return res.status(400).json({"error":"No order found in DB....."});
    }
    req.order=order;
    next();
})
}


//create//
exports.createOrder=(req,res)=>
{
    req.body.order.user=req.profile;

    const order=new Order(req.body.order);

    order.save((err,order)=>
    {
        if(err)
        {
            return res.status(400).json({"error":"Failed to save your order in DB....."});
        }
        res.json(order);
    })
}


//listing//
exports.getAllOrders=(req,res)=>
{
    Order.find({})
    .populate("user","_id name")
    .exec((err,order)=>
    {
        if(err)
        {
          return res.status(400).json({error:"No orders foud in DB...."});
        }
      res.json(order);
    })
}



exports.getOrderStatus=(req,res)=>
{
   res.json(Order.schema.path("status").enumValues);
}


//update//
exports.updateStatus=(req,res)=>
{
  Order.update(
  {_id:req.body._id},
  {$set:{status:req.body.status}},
  (err,order)=>
  {
      if(err)
      {
          return res.status(400).json({error:"Cannot update the order status..."});
      }
      res.json(order);
  }
  )
}
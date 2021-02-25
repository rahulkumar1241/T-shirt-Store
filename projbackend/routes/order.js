const express=require("express");
const router=express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user");
const {updateStock}=require("../controllers/product")
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} =require("../controllers/order");

//params//
router.param("userId",getUserById)
router.param("getOrderById",getOrderById);


//actual routes goes here//


//create route//
router.post("/order/create/:userId",isSignedIn, isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)

//read//
router.get("/order/all",isSignedIn,isAuthenticated,isAdmin,getAllOrders)


//status of the order//
router.get("/order/status/:orderId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);
module.exports=router;       
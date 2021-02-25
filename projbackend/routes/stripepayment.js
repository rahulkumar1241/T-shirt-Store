
const express = require("express");
const router = express.Router();

//controllers//
const {makepayment}=require("../controllers/stripepayment");

//routes//
router.post("/stripepayment",makepayment);



module.exports = router;
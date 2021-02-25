const express=require("express");
const router=express.Router();

const {getCategoryById,createCategory, getAllCategories,getCategory,updateCategory,removeCategory}=require("../controllers/category");
const {getUserById}=require("../controllers/user");
const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth");



//params//

router.param("categoryId",getCategoryById);
router.param("userId",getUserById);

//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

//read//
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategories);



//delete//
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory);

//routes goes here//
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

module.exports=router;

const Category=require("../models/category");

exports.getCategoryById=(req,res,next,id)=> 
{
Category.find({_id:id}).exec((err,cate)=>
{
    if(err)
    {
      return res.status(404).json({
       "error":"Category not found in DB..."
      })        
    }
    // console.log(cate);
    req.category=cate;
    next();
});
}


//create category

exports.createCategory=(req,res)=>
{
  const category=new Category(req.body);
  category.save((err,category)=>{
    if(err)
    {
      return res.status(400).json({
          "error":"Not able to save category in DB.."
      })        
    }
    res.json(category);    
  });
}



exports.getCategory=(req,res)=>
{
   return res.json(req.category);
  // console.log("hey there....");
}


exports.getAllCategories=(req,res)=>
{
Category.find({}).exec((err,categories)=>
{
   if(err || !categories)
   {
      return res.status(400).json({
        "error":"No categories found in DB..."
      })
   }
   res.json(categories);
});
// console.log("hey there....");
}

//UPDATE//
exports.updateCategory=(req,res)=>
{
  console.log(req.category[0]._id);
   Category.findByIdAndUpdate({_id:req.category[0]._id},{$set:req.body},{ new: true, useFindAndModify: false },(err,doc)=>{
    if(err)
    {
       return res.status(400).json({
         "msg":"Not able to update category..."
       });
    }

    res.json({
      "msg":"Category updated succesfully...."
    })
   }) 
}

//delete category//

exports.removeCategory=(req,res)=>
{
    const category=req.category[0];
    category.remove((err,removedCategory)=>
    {
      if(err)
      {
        return res.status(400).json({
          "error":"Not able to delete Category.."
        })
      }
      res.json({
        "msg":"Deleted sucessfully...."
      })
    })
}


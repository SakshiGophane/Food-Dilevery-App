
const express = require("express")
const router = express.Router();
const {data} = require("../models/foodItems")
const {category} = require("../models/foodCategory")



router.post("/foodData",(req,res)=>{
   

    try{
        res.status(401).send([data(),category()]);

    }
    catch(err){
        console.error(err.message);
        res.send("server error")
    }
})







module.exports = router
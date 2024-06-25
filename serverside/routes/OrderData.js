
const express = require("express")
const router = express.Router();
// const {data} = require("../models/foodItems")
// const {category} = require("../models/foodCategory")
const Order = require("../models/Orders")
const axios = require('axios')

// from frontend to backend
router.post('/orderData', async (req, res) => {

    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("email = ",req.body.email)
   
    // find email 
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)

    // if new
    if (eId === null) {
        try {

            console.log(data)
           

            // create order
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } 
        catch (error) {
            console.log(error.message)
            res.send("Server Error" +  error.message)

        }
    }

    // if user already exists and it had ordered something in past
    // find and update (push = continue/append)
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


// ----------------------------------------------------------------------------------------------------



router.post('/myOrderData', async (req, res) => {
    try {
        console.log("email = ",req.body.email)
        
        let myData = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:myData})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});







router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})




module.exports = router
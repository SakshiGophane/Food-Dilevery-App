const express = require("express")
const router = express.Router();
const user = require("../models/user")
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios")



const jwtSecret = "IAmTheSafestWayToSecurePassword"


router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await user.create({
            name: req.body.name,
            // password: req.body.password,  first write this and then use bcryptjs
            password: securePass,
            email: req.body.email,
            location: req.body.location
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})




// ----------------------------------------------------------------------------------------------------------


// data comes from frontend is matched to the mongo data or not ie login
// find data
router.post("/loginuser",
[
    body('email').isEmail(),
    body('password',"Incorrect password").isLength({ min: 2 })
],

 async(req,res)=>{
    
    // validate if result is not empty then consider it has error
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }



    let email = req.body.email
   
    try{
       let user_data = await user.findOne({email})

        // if no email
        if(!user_data){
            return res.status(400).json({ errors: "Try logging with correct credentials"});
        }

        // compare original pass with encrypted hash
        const passCompare = await bcrypt.compare(req.body.password , user_data.password )

        // if not matched
        if(!passCompare){
            return res.status(400).json({ errors: "Try logging with correct credentials"});
        }

        // data  = id which is find in mongodb  store in user in data
        const data = {
            user : {
                id:user_data.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)
        return res.json({success:true , authToken:authToken})
    }
    catch(error){
        console.log(error);
        res.json({success:false})
    }
})




// ------------------------------------------------------------


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
const {readFileSync}  = require("fs");

    
let category =()=>
        JSON.parse(readFileSync("foodCategory.json"))
    


module.exports = {category}


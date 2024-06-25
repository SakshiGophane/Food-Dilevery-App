const {readFileSync}  = require("fs");

let data = ()=>
    JSON.parse(readFileSync("foodData2.json")) 
    
// let category =()=>
//         JSON.parse(readFileSync("foodCategory.json"))
    





   


module.exports = {data}


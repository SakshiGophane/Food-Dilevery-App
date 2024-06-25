const express = require("express")
const app = express();
const port = 5000;
const {data} = require("./models/foodItems")
const path = require("path");

const DBConnection = require("./db");
DBConnection()

// middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(express.json())
app.use("/api", require("./routes/createUser"))
app.use("/api", require("./routes/DisplayData"))
app.use("/api", require("./routes/OrderData"))



// app.get("/", (req, res) => {
// app.use(express.static(path.resolve(__dirname, "client", "public")));
// res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
// });



// app.get("/",(req,res)=>{
//     res.send("hello")
// })

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})
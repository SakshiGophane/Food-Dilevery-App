const mongoose = require("mongoose");

const DBConnection = async () => {
    
    const MONGO_URI=`mongodb://user:user123@ac-wfms44p-shard-00-00.pqh4qpz.mongodb.net:27017,ac-wfms44p-shard-00-01.pqh4qpz.mongodb.net:27017,ac-wfms44p-shard-00-02.pqh4qpz.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-11h5q7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
// add database gofoodmern

await mongoose.connect(MONGO_URI);

    try {
        // .connect(url,object)
        // await mongoose.connect(MONGO_URI);
        console.log('Database connected successfully');

        // const fetched_data = await mongoose.connection.db.collection("foodItems");


        // fetched_data.find({}).toArray(

        //      function (err, data) {

        //         if(err) {
        //             console.log("error",err);
        //         }
        //         else {
        //             global.foodItems = data;
                    
        //         }

        // })

    }
     catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

module.exports = DBConnection;





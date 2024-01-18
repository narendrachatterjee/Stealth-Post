const mongoose = require("mongoose");

module.exports = ()=>{
    mongoose
        .connect(
            process.env.mongoConnectionString,            
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then((x) => {
            console.log("Connected to Mongo!");
        })
        .catch((err) => {
            console.log("Error in connecting to Mongo! "+err);
        });
}

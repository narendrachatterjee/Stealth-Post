const mongoose = require("mongoose");

module.exports = ()=>{
    mongoose
        .connect(
            "mongodb+srv://narendrachatterjee:" +
                process.env.mongoPassword +
                "@cluster0.ganwmr2.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then((x) => {
            console.log("Connected to Mongo!");
        })
        .catch((err) => {
            console.log("print"+process.env.mongoPassword);
            console.log("Error in connecting to Mongo! "+err);
        });
}

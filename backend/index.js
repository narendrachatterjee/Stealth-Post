require("dotenv").config();
const express = require("express");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const app = express();
const cors = require("cors");
const connection = require("./db");
const User = require("./models/user");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const cookieSession = require("cookie-session");
const googleAuth = require("./routes/googleAuth");

//middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}
));
app.use(cookieSession({
    name : "session",
    keys : ["secretApp"],
    maxAge: 24*60*60*100
}))
app.use(passport.initialize());
app.use(passport.session());

// database connection
connection();

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwtPrivateKey;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

//routes
app.use("/auth",authRoutes);
app.use("/message",messageRoutes);

//Prodction Assets
/*if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join("/frontend-1/build")));
    app.get("*",(req,res)=> 
        res.sendFile(path.resolve(__dirname,'frontend-1','build','index.html'))
    )
}*/

const port = process.env.PORT || 8080;
app.listen(port, ()=>console.log('listening to port: '+port));


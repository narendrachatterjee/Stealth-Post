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
const socketIO = require('socket.io');
const http = require('http');


//middleware
app.use(express.json());
app.use(cors({
    origin:"https://stealthpost.netlify.app",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}
));

//socket
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

//routes
app.use("/auth",authRoutes);
app.use("/message",messageRoutes);


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



const port = process.env.PORT || 8080;
app.listen(port, ()=>console.log('listening to port: '+port));


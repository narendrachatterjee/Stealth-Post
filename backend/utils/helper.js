const jwt = require("jsonwebtoken");

const getToken = async(email, user) => {
    const token = jwt.sign({email, identifier: user._id},process.env.jwtPrivateKey );
    return token;
};

module.exports = getToken;

const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const getToken   = require("../utils/helper");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

router.post("/signup", async (req, res) => {
	try {
		const {Email, Password, firstName, lastName} = req.body;
		const existingUser = await User.findOne({ Email });
    	if (existingUser) {
      		return res.status(422).json({ error: 'User already exists.' });
    	}

		const hashPass = bcrypt.hashSync(Password, 10);
		const newUserData = {
			Email,
			Password: hashPass,
			firstName,
			lastName
		};
		const newUser = await User.create(newUserData);

		const Token = await getToken(Email,newUser);

		const userToReturn  = {...newUser.toJSON, Token};
		delete userToReturn.password;
		res.status(200).json(userToReturn);

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/login", async (req, res)=>{
	try{
		const {Email, Password} = req.body;
		const existingUser = await User.findOne({Email});
			if (!existingUser) {
				return res.status(403).json({ error: 'Invalid Credentials' });
			}
		const isValidPassword = await bcrypt.compare(Password, existingUser.Password);
		if(!isValidPassword){
			return res.status(403).json({ error: 'Invalid Credentials' });	
		}
		else{
			const Token = await getToken(existingUser.Email,existingUser);
			const userToReturn  = {...existingUser.toJSON(), Token};
			delete userToReturn.Password;
			res.status(200).json(userToReturn);
		}
	} catch(error){
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error:true,
		message:"Login Failed"
	})
});

router.get("/login/success", (req,res) => {
	if(req.user){
		res.status(200).json({
			error:false,
			message:"Successfully Logged In",
			user: req.user
	})
	}else{
		res.status(403).json({error: true, message:"Not Authorized!!"});	
	}
});


router.get("/google",passport.authenticate("google",["profile","email"]));

router.get(
	"/google/callback",
	passport.authenticate("google",{
		successRedirect: process.env.client_url,
		failureRedirect: "/login/failed"
	})
);

router.get("/logout",(res,req) => {
	req.logout();
	res.redirect(process.env.client_url);
});

router.post("/forgotPassword", async (req,res)=>{
	try{
		const {email} = req.body;
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(422).json({ error: 'User does not exist' });
		}
		const token = jwt.sign({Email:email},process.env.jwtPrivateKey,{expiresIn:"1d"});
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			}
		});
			
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: 'narendrachat109@gmail.com',
			subject: 'Reset Password',
			text: `Click the following link to reset your password: http://localhost:3000/forgotPassword/${existingUser.Email}/{$token}`
		};

		await transporter.sendMail(mailOptions);
    	console.log('Email sent successfully');
    	res.status(200).json({ message: 'Reset password email sent successfully' });

	}catch (error) {
		console.error('Error sending reset password email:', error);
		res.status(500).json({ error: 'Internal server error' });
	  }
	
});


module.exports = router;
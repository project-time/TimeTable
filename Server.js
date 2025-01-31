
var bp = require('body-parser');
var mongoose = require('mongoose');
var passportlocalmongoose = require('passport-local-mongoose');
var passport = require('passport');
var passportlocal = require('passport-local');
var user = require("./Database/User");
var express = require('express');
const path = require('path');

mongoose.connect("mongodb+srv://projecttime2025:marvelxdc%4026@clusterprojecttime.9npkc.mongodb.net/?retryWrites=true&w=majority&appName=Clusterprojecttime");
var app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.urlencoded({ extended: true }));
app.use(require("express-session")
({
	secret: "Bhaargav",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('public'));


passport.use(new passportlocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.get("/", function (req, res) {
	res.render("Dashboard");
});

app.get("/Profile", isLoggedIn, function (req, res) {
	res.render("Profile");
});

app.get("/Signup", function (req, res) {
	res.render("Signup");
});

app.post("/Signup", function (req, res) {
	var firstname = req.body.firstname
	var lastname = req.body.lastname
	var username = req.body.username
	var password = req.body.password
	user.register(new user({ 
		firstname: firstname,
		lastname: lastname,
		username: username,
	    }),
			password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("Signup");
		}

		passport.authenticate("local")
		(
			req, res, function () {
			res.render("Signin");
		});
	});
});


app.get("/Signin", function (req, res) {
	res.render("Signin");
});

app.post("/Signin", passport.authenticate("local", {
	successRedirect: "/Profile",
	failureRedirect: "/Signin"
}), function (req, res) {
});
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) 
	return next();
	res.redirect("/Signin");
}
var port = process.env.PORT || 8000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
var express = require('express');
var bp = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var user = require("./Database/User");
const path = require('path');

var app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Bhaargav",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://projecttime2025:marvelxdc%4026@clusterprojecttime.9npkc.mongodb.net/?retryWrites=true&w=majority&appName=Clusterprojecttime", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.get("/", function (req, res) {
    res.render("Index");
});

app.get("/Signin", function (req, res) {
    res.render("Signin", { error: null });
});

app.post("/Signin", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) { 
            return res.render("Signin", { error: "Enter the Username and Password Correctly" });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect("/Profile");
        });
    })(req, res, next);
});

app.get("/Profile", function (req, res) {
    res.render("Profile");
});

app.get("/Signup", function (req, res) {
    res.render("Signup", { error: null });
});

app.post("/Signup", function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = req.body.password;

    user.register(new user({
        firstname: firstname,
        lastname: lastname,
        username: username
    }), password, function (err, newUser) {
        if (err) {
            if (err.name === 'UserExistsError') {
                return res.render("Signup", { error: "User already exists" });
            }
            return res.render("Signup", { error: "An error occurred during signup" });
        }
        res.redirect("/Signin");
    });
});

var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("Server Has Started on port " + port + "!");
});
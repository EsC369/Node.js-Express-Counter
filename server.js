var express = require("express");
var app = express();
// Satic:
app.use(express.static(__dirname + "/static"));
// Set views:
app.set('views', __dirname + '/views'); 
// Set EJS:
app.set('view engine', 'ejs');

// Sessions: 
var session = require('express-session');
app.use(session({
  secret: 'EsC1337',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
})) 

// Routes:
app.get("/", function(req, res){
    if(!req.session["count"]) {
        req.session["count"] = 0;
    }
    req.session.count++;
    res.render("index", {count: req.session.count})
});
app.get("/plus2", function(req, res){
    if(!req.session["count"]) {
        req.session["count"] = 0;
    }
    req.session.count++;
    res.redirect("/");
});
app.get("/reset", function(req, res){
    req.session.count = 0;
    res.redirect("/");
});

// Listeing On Port 8000:
app.listen(8000);
console.log("Running in localhost at port 8000");
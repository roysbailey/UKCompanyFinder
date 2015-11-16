var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");

// Setup the View Engine

app.set("view engine", "vash");

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Map the routes
controllers.init(app);

app.get("/api/users", function (req, res) {
  res.set("Content-Type", "application/json");
  res.send({ name: "Shawn", isValid: true, group: "Admin" });
});

var server = http.createServer(app);

server.listen(process.env.PORT || 3000);

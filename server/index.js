//Express makes our job easy, best server ever
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
//passport things
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//For storing the session key in mongostore in our local storage
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const app = express();
app.use(cors());
// app.all('*', function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
// 	res.header('Access-Control-Allow-Headers', 'Content-Type')
// 	next()
//   })

//import passport-jwt-strategy gor api authentication
const passportJWT = require("./config/passport-jwt-strategy");

app.use(express.json());

var bodyParser = require("body-parser");
// app.use(bodyParser.json());

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Connecting the CSS/JS/Images files to assets
app.use(express.static("./assets"));

app.use(cookieParser());

//Using the EJS as view engine
app.set("view engine", "ejs");
//specifying the directory for our views/EJS templates
app.set("views", "./views");

//This enables us to get the form data as req.body
app.use(express.urlencoded());

//Defined our mongodb data in config/mongoose and importing this actually connects us to the DB
const db = require("./config/mongoose");

//8 we will use mongostore to store session details in DB
app.use(
  session({
    name: "user-auth",
    secret: "secretKey", //this key is used to encrypt the cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
      //1000 - 1 ms so 1000*60*100 = 10 mins we keep cookie age of only 10 mins and it expires after that.
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "Connect-Mongo --> Mongo-session store in DB okay!");
      }
    ),
  })
);

//Use the passport library
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Getting the routes from routes folder
app.use("/", require("./routes"));

//Listening the server on this PORT
const PORT = process.env.PORT || 9000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting the server - ", err);
  } else {
    console.log("Server running successfully on port - ", PORT);
  }
});

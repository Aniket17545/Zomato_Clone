const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
const dotenv = require("dotenv");
const passport = require('passport');
const cookieSession = require('cookie-session');

const paymentRoutes = require("./Controller/payment");
const authRoutes = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

dotenv.config();

const Port = process.env.PORT || 5500;
const host = "localhost";

const atlasDbUrl = 'mongodb+srv://newUser:OLIMBXCFi0x6VvXM@cluster0.0qsdpz5.mongodb.net/zomato?retryWrites=true&w=majority';

// User Name :- newUser
// Password :- OLIMBXCFi0x6VvXM
// DBName :- zomato

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();
app.use(express.json());

app.use(cookieSession({ name: "session", keys: ["edureka"], maxAge: 24 * 60 * 60 * 1000 }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use('/', route);
app.use("/api/payment/", paymentRoutes);
app.use("/auth", authRoutes);

mongoose.connect(atlasDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(res => {
        app.listen(Port, host, () => {
            console.log(`Server is running at ${host}: ${Port}`)
        });
    })
    .catch(err => console.log(err));
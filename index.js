const   express  = require("express");
require("dotenv").config();
const app = express();
const mongoose  = require("mongoose");
const cors =  require("cors");
const Routes = require("./src/router/order.router")
// console.log(process.env.Db_URL)
const DATABASE = process.env.Db_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.use(cors());

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(express.json());

// Middleware function to trim req.body
app.use((req, res, next) => {
  // Check if the request has a body
  if (req.body) {
    // Trim each value in req.body
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  console.log("HTTP method is " + req.method + ", URL -" + req.url);
  next(); // Proceed to the next middleware or route handler
});

app.use("/api/v1", Routes);



app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Backend server is running on:- ${process.env.SERVER_PORT}`);
});

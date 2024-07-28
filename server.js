const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();
//rest obejct
const app = express();
app.use(cors());
app.options('*', cors());
//middlewares
app.use(express.json());
app.use(moragan("dev"));
//routes
app.use("/api/v1/item", require("./routes/itemRoutes"));
// app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/bills", require("./routes/billsRoute"));
app.use("/api/v1/user", require("./routes/userRoutes"));

// port
const port = process.env.PORT || 8080;
//rest obejct
app.listen(port, () => {
    console.log(
      `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
        .bgCyan.white
    );
  });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 7000;
const userRoutes = require("./src/user/user.routes");
const bodegaRoutes = require("./src/bodega/bodega.routes");
const stockRoutes = require("./src/inventariostock/stock.routes");
const authroutes = require("./src/user/auth/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api", userRoutes);
app.use("/api", bodegaRoutes);
app.use("/api", stockRoutes);
app.use("/api/auth", authroutes);

app.get("/api", (req, res) => {
  //res.json({"users": ["A","B","C"]});
  res.send("WELCOME");
});

mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log("Conectado a MongoDB ATLAS"))
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log("Server started on port", port);
});

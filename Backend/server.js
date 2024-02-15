const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

connectDb();
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", userRoutes);
app.use("/recipes", recipeRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port 5000`);
});

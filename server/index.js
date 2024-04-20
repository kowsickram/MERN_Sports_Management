const { config } = require("dotenv");
config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT ;
const connectDB = require("./config/db");
connectDB();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// const SportDB = require("./models/Sport")
// SportDB();

//Router
const authRoutes = require("./routes/authRoutes")
app.use('/api', authRoutes);

const sportRoutes = require("./routes/sportRoutes")
app.use('/sports',sportRoutes);

const masterRoutes = require("./routes/masterRoutes")
app.use("/master", masterRoutes)






// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
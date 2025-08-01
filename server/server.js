require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const contentRouter = require("./routes/contentRouter.js");
const authRouter = require("./routes/authRouter.js");
const fs = require('fs');
const config = require('./config.js');


app.use(express.json());
// app.use(cors());
// app.use(cors({ origin: '*' }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());
app.use("/cache/images", express.static("cache/images"));
app.use("/cache/thumbs", express.static("cache/thumbs"));

app.use("/", contentRouter);
app.use("/auth", authRouter);


// Автоматическое создание папок (если их нет)
Object.values(config.uploads).forEach(dir => {
  if (typeof dir === "string" && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});



const start = async () => {

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('connected to aao db');
    // app.listen(port, '0.0.0.0', () => console.log('Server starts on port', port));
    app.listen(port, () => console.log('Server starts on port', port));
  } catch (e) {
    console.log(e)
  }
}

start();
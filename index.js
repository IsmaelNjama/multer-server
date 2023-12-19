require("dotenv").config();
const axios = require("axios");
const express = require("express");

const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 2500;

app.use(express.static("uploads"));
app.use(cors({ origin: "*" }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const splt = file.originalname.split(".");
    const suffix = splt[splt.length - 1];
    cb(null, file.fieldname + uniqueSuffix + "." + suffix);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/uploads", upload.single("image"), async (req, res, next) => {
  try {
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const url = `http://localhost:5000/${req.file.filename}`;
    res.send(url);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log("listening on port... " + PORT));

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DATA_FILE = "./data/devs.json";

// 🟢 GET all developers
app.get("/api/devs", (req, res) => {
  const data = fs.readFileSync(DATA_FILE);
  const devs = JSON.parse(data);
  res.json(devs);
});

// 🟢 POST new developer
app.post("/api/devs", (req, res) => {
  const { name, role, skills } = req.body;
  if (!name || !role || !skills) {
    return res.status(400).json({ message: "All fields required" });
  }

  const data = fs.readFileSync(DATA_FILE);
  const devs = JSON.parse(data);
  const newDev = { id: Date.now(), name, role, skills };
  devs.push(newDev);

  fs.writeFileSync(DATA_FILE, JSON.stringify(devs, null, 2));
  res.status(201).json(newDev);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ DevConnect running on port ${PORT}`));

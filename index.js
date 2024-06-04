import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
// const API_URL = "http://localhost:4000";

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Main page
app.get("/", async (req, res) => {
  try {
    res.render("index.ejs", {});
  } catch (error) {
    res.status(500).json({ message: "Error loading main page" });
  }
});

// Get
app.get("/get", async (req, res) => {
  try {
    res.render("index.ejs", {});
  } catch (error) {
    res.status(500).json({ message: "Error loading main page" });
  }
});

// At end
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

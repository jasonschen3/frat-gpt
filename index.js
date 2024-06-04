import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistantId = "asst_MiX6teEw6QATVgugsBalTl0N";

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

// Main page
app.get("/", async (req, res) => {
  try {
    res.render("index", { generatedMessage: "" });
  } catch (error) {
    console.error("Error loading main page:", error);
    res.status(500).json({ message: "Error loading main page" });
  }
});

// Create and run an OpenAI thread
app.post("/message", async (req, res) => {
  try {
    console.log("Form data received:", req.body);
    const { frat, srat, occasion, date, time, location } = req.body;
    const messageContent = `Frat: ${frat}, Sorority: ${srat}, Occasion: ${occasion}, Date: ${date}, Time: ${time}, Location: ${location}`;

    const thread = await openai.beta.threads.create();
    console.log(thread);

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: messageContent,
    });
    await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    const messages = await openai.beta.threads.messages.list(thread.id);
    const assistantResponse =
      messages.find((msg) => msg.role === "assistant").content ||
      "No response from assistant.";

    console.log("Assistant response:", assistantResponse);
    res.render("index", { generatedMessage: assistantResponse });
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    res.render("index", {
      generatedMessage: "Error communicating with OpenAI API",
    });
  }
});

// At end
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

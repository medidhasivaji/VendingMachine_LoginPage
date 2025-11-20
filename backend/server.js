import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* =============================================================
   TEMP LOGIN (NO DATABASE)
   Allows any user to log in during front-end development.
   ============================================================= */
app.post("/api/login", (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("TEMP LOGIN SUCCESS for:", user_id);

  return res.json({
    message: "Login successful",
    user: {
      id: user_id,
      name: "User " + user_id
    }
  });
});

/* =============================================================
   TEMP REGISTER (NO DATABASE)
   Always successful for now.
   ============================================================= */
app.post("/api/register", (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("TEMP REGISTER created:", user_id);

  return res.json({ message: "Account created successfully" });
});


/* =============================================================
   START SERVER
   ============================================================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

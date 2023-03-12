import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
// import { jwtTokens } from '../utils/jwt-helpers.js';

// let refreshTokens = [];

const router = express.Router();

// READ users listing
router.get("/", authenticateToken, async (req, res) => { 
  try {
    // console.log(req.cookies);
    const users = await pool.query("SELECT * FROM users");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => { // /:user_id
  try {
    // console.log(req.cookies);
    const users = await pool.query("SELECT * FROM users WHERE id=$1", [ // user_id
      req.params.id, // user_id
    ]);
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE 
router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name,phone,email,password,inserted_at,updated_at) VALUES ($1,$2,$3,$4,NOW(),NOW())",
      [req.body.name, req.body.phoneNumber, req.body.email, hashedPassword]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
});

// UPDATE
router.put("/:id", authenticateToken, async (req, res) => { // /:user_id
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await pool.query(
        "update users set name=$1, phone=$2, email=$3, password=$4, inserted_at=$5, updated_at=$6 where id=$7",
        [
          req.body.name,
          req.body.phone,
          req.body.email,
          hashedPassword,
          req.body.inserted_at,
          req.body.updated_at,
          req.params.id,
        ]
      );
      res.json({ users: newUser.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// DELETE
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query("DELETE FROM users WHERE id=$1", [
        req.params.id,
    ]);
    return res.status(200).json("Deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

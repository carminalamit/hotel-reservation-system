import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
// import { jwtTokens } from '../utils/jwt-helpers.js';

// let refreshTokens = [];

const router = express.Router();

// READ users listing
router.get("/", authenticateToken, async (req, res) => { // authenticateToken
  try {
    // console.log(req.cookies);
    const users = await pool.query("SELECT * FROM users");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:user_id", authenticateToken, async (req, res) => {
  try {
    // console.log(req.cookies);
    const users = await pool.query("SELECT * FROM users WHERE user_id=$1", [
      req.params.user_id,
    ]);
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE 
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (role,name,phone,email,password) VALUES ($1,$2,$3,$4,$5)",
      [req.body.role, req.body.name, req.body.phoneNumber, req.body.email, hashedPassword]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
});

// UPDATE
router.put("/:user_id", authenticateToken, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await pool.query(
        "update users set role=$1, name=$2, phone=$3, email=$4, password=$5 where user_id=$6",
        [
          req.body.role,
          req.body.name,
          req.body.phone,
          req.body.email,
          hashedPassword,
          req.params.user_id,
        ]
      );
      res.json({ users: newUser.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// DELETE
router.delete("/:user_id", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query("DELETE FROM users WHERE user_id=$1", [
        req.params.user_id,
    ]);
    return res.status(200).json("Deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

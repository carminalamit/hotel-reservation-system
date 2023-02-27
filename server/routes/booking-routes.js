import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// READ
router.get("/", async (req, res) => {
  try {
    const booking = await pool.query("SELECT * FROM booking");
    res.json({ booking: booking.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:booking_id", async (req, res) => {
  try {
    const booking = await pool.query("SELECT * FROM booking WHERE booking_id=$1", [
      req.params._id,
    ]);
    res.json({ booking: booking.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE 
router.post("/", authenticateToken, async (req, res) => {
  console.log(req.user)
  try {
    const newBooking = await pool.query(
      "INSERT INTO booking (check_in,check_out,user_id,room_id) VALUES ($1,$2,$3,$4)",
      [req.body.check_in, req.body.check_out, req.user.user_id, req.body.room_id]
    );
    res.json({ booking: newBooking.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:booking_id", async (req, res) => {
    try {
      const newBooking = await pool.query(
        "update booking set check_in=$1, check_out=$2 where booking_id=$3",
        [
          req.body.check_in,
          req.body.check_out,
          req.params.booking_id,
        ]
      );
      res.json({ booking: newBooking.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// DELETE
router.delete("/:booking_id", async (req, res) => {
  try {
    const booking = await pool.query("DELETE FROM booking WHERE booking_id=$1", [
        req.params.booking_id,
    ]);
    return res.status(200).json("Deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

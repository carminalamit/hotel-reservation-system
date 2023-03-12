import express from "express";
import pool from "../db.js";
import { parseISO } from "date-fns";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// READ
router.get("/", async (req, res) => {
  try {
    const booking = await pool.query("SELECT * FROM bookings");
    res.json({ bookings: booking.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await pool.query("SELECT * FROM bookings WHERE id=$1", [
      req.params.id,
    ]);
    res.json({ bookings: booking.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE 
router.post("/", authenticateToken, async (req, res) => {
  console.log(req.body)
  try {
    const {rows} = await pool.query("SELECT COUNT(*) FROM bookings WHERE room_id = $3 AND ( check_in <= $2 AND check_out >= $1 OR check_in <= $1 and check_out >= $1)", 
    [parseISO(req.body.check_in), parseISO(req.body.check_out), req.body.room_id])
    console.log(rows)
    if (parseInt(rows[0]?.count)) {
      console.log(rows)
      return res.status(500).json({ error: "room is not available" });
    }  

    const newBooking = await pool.query(
      "INSERT INTO bookings (check_in,check_out,user_id,room_id,inserted_at,updated_at) VALUES ($1,$2,$3,$4,NOW(),NOW())",
      [parseISO(req.body.check_in), parseISO(req.body.check_out), req.user.id, req.body.room_id]
    );
    res.json({ bookings: newBooking.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// UPDATE
router.put("/:id", async (req, res) => {
    try {
      const newBooking = await pool.query(
        "update bookings set check_in=$1, check_out=$2, inserted_at=$3, updated_at=$4 where id=$5",
        [
          req.body.check_in,
          req.body.check_out,
          req.body.inserted_at,
          req.body.updated_at,
          req.params.id,
        ]
      );
      res.json({ bookings: newBooking.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const booking = await pool.query("DELETE FROM bookings WHERE id=$1", [
        req.params.id,
    ]);
    return res.status(200).json("Deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/room-id/:room_id", async (req, res) => {
  try {
    const booking = await pool.query("SELECT * FROM bookings where room_id=$1", [
      req.params.room_id
    ])
    console.log(req.params.room_id)
    res.json({ bookings: booking.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


export default router;

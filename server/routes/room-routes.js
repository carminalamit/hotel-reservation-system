import express from "express";
import pool from "../db.js";
import multer from "multer";
// import path from "path";

const router = express.Router();

// console.log(process.env.IMAGE_FOLDER_PATH);
// const desktopPath = path.join("C:/Users/DELL/Desktop", "images");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// READ
router.get("/", async (req, res) => {
  try {
    const rooms = await pool.query(
      "SELECT *, i.id AS image_id, r.id AS id FROM rooms r LEFT JOIN images i ON r.id = i.room_id"
    );

    res.json({ rooms: rooms.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await pool.query(
      "SELECT * FROM rooms LEFT JOIN images ON rooms.id = images.room_id WHERE rooms.id=$1",
      [req.params.id]
    );
    res.json({ rooms: room.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.files);
  try {
    const imageData = req.file.buffer;
    const imageName = req.file.originalname;
    const newRoom = await pool.query(
      "INSERT INTO rooms (room_no,rate,details,max_guests,checkin_time,checkout_time,room_type,inserted_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),NOW()) RETURNING id",
      [
        req.body.room_no,
        req.body.rate,
        req.body.details,
        req.body.max_guests,
        req.body.checkin_time,
        req.body.checkout_time,
        req.body.room_type,
      ]
    );
    console.log(newRoom);
    await pool.query(
      "INSERT INTO images (image_data,image_name,room_id,inserted_at,updated_at) VALUES ($1,$2,$3,NOW(),NOW())",
      [imageData, imageName, newRoom.rows[0].id]
    );

    res.json({ rooms: newRoom.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const newRoom = await pool.query(
      "UPDATE rooms SET rate=$1, details=$2, max_guests=$3, checkin_time=$4, checkout_time=$5, inserted_at=$6, updated_at=$7, room_type=$8 where id=$9",
      [
        req.body.rate,
        req.body.details,
        req.body.max_guests,
        req.body.checkin_time,
        req.body.checkout_time,
        req.body.inserted_at,
        req.body.updated_at,
        req.body.room_type,
        req.params.id,
      ]
    );

    await pool.query(
      "UPDATE images SET image_data=$1, image_name=$2, updated_at=NOW() where room_id=$3",
      [req.file.buffer, req.file.originalname, req.params.id]
    );

    res.json({ rooms: newRoom.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const room = await pool.query("DELETE FROM rooms WHERE id=$1", [
      req.params.id,
    ]);
  
    return res.status(200).json("Deleted!");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;

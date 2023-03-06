import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

console.log(process.env.IMAGE_FOLDER_PATH)
const desktopPath = path.join('C:/Users/DELL/Desktop', 'images')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/DELL/Desktop');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// READ
router.get("/", async (req, res) => {
  try {
    const room = await pool.query("SELECT * FROM room");
    res.json({ room: room.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:room_id", async (req, res) => {
  try {
    const room = await pool.query("SELECT * FROM room WHERE room_id=$1", [
      req.params.room_id,
    ]);
    res.json({ room: room.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE 
router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.files)
  try {
    const imagePath = '/uploads/' + req.file.filename;
    const newRoom = await pool.query(
      "INSERT INTO room (type,rate,details,max_count,status,img_url,checkin_time,checkout_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [req.body.type, req.body.rate, req.body.details, req.body.max_count, req.body.status, imagePath, req.body.checkin_time, req.body.checkout_time]
    );
    res.json({ room: newRoom.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:room_id", async (req, res) => {
    try {
      const newRoom = await pool.query(
        "UPDATE room SET type=$1, rate=$2, details=$3, max_count=$4, status=$5, img_url=$6, checkin_time=$7, checkout_time=$8 where room_id=$9",
        [
          req.body.type,
          req.body.rate,
          req.body.details,
          req.body.max_count,
          req.body.status,
          req.body.img_url,
          req.body.checkin_time,
          req.body.checkout_time,
          req.params.room_id,
        ]
      );
      res.json({ room: newRoom.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// DELETE
router.delete("/:room_id", async (req, res) => {
  try {
    const room = await pool.query("DELETE FROM room WHERE room_id=$1", [
        req.params.room_id,
    ]);
    return res.status(200).json("Deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


// import express from "express";
// import pool from "../db.js";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // READ
// router.get("/", async (req, res) => {
//   try {
//     const room = await pool.query("SELECT * FROM room");
//     res.json({ room: room.rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.get("/:room_id", async (req, res) => {
//   try {
//     const room = await pool.query("SELECT * FROM room WHERE room_id=$1", [
//       req.params.room_id,
//     ]);
//     res.json({ room: room.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // CREATE
// router.post("/", upload.single("image"), async (req, res) => {
//   console.log(req.file);
//   try {
//     const { type, rate, details, max_count, status, img_url, checkin_time, checkout_time } = req.body;
//     const newRoom = await pool.query(
//       "INSERT INTO room (type,rate,details,max_count,status,img_url,checkin_time,checkout_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
//       [type, rate, details, max_count, status, req.file.path, checkin_time, checkout_time]
//     );
//     res.json({ room: newRoom.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // UPDATE
// router.put("/:room_id", async (req, res) => {
//   try {
//     const { type, rate, details, max_count, status, img_url, checkin_time, checkout_time } = req.body;
//     const newRoom = await pool.query(
//       "UPDATE room SET type=$1, rate=$2, details=$3, max_count=$4, status=$5, img_url=$6, checkin_time=$7, checkout_time=$8 WHERE room_id=$9",
//       [type, rate, details, max_count, status, img_url, checkin_time, checkout_time, req.params.room_id]
//     );
//     res.json({ room: newRoom.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // DELETE
// router.delete("/:room_id", async (req, res) => {
//   try {
//     const room = await pool.query("DELETE FROM room WHERE room_id=$1", [
//         req.params.room_id,
//     ]);
//     return res.status(200).json("Deleted!");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;

import express from "express";
import pool from "../config/db.js";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const router = new express.Router();
const upload = multer({ dest: "upload/" });

app.use(bodyParser());

router.get("/product", (req, res) => {
  pool.query("select * from products", (err, result) => {
    res.send(result.rows);
  });
});

router.post("/add-product", async (req, res) => {
  try {
    const { title, description, price, file } = req.body;
    const newData = await pool.query(
      "INSERT INTO products (title,description,price,image) VALUES($1,$2,$3,$4)",
      [title, description, price, file]
    );
    res.json(newData);
    console.log(file);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/add-product", upload.single("file"), async (req, res) => {
//   try {
//     const { uid } = req.body[1][0];
//     // console.log(req.body[1][0]);
//     const { title, description, price } = req.body[0];
//     // const { file } = req.body[1];
//     // console.log(req.body[1][1]);
//     // const { uid } = req.body.file;
//     console.log(uid);
//     const newData = await pool.query(
//       "INSERT INTO products (title,description,price) VALUES($1,$2,$3)",
//       [title, description, price]
//     );
//     res.json(newData);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.delete("/delete-product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const deleteProduct = await pool.query(
      "DELETE FROM products where id = ($1)",
      [id]
    );
    res.json("Product was deleted");
  } catch (error) {
    console.log(error);
  }
});

export default router;

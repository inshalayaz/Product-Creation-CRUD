import express from "express";
import pool from "../config/db.js";
const router = new express.Router();
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser());

router.get("/product", (req, res) => {
  pool.query("select * from products", (err, result) => {
    res.send(result.rows);
  });
});

router.post("/add-product", async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, price } = req.body;

    const newData = await pool.query(
      "INSERT INTO products (title,description,price) VALUES($1,$2,$3)",
      [title, description, price]
    );

    res.json(newData);
  } catch (error) {
    console.log(error);
  }
});

export default router;

import express from "express";
import pool from "../config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { verifyToken } from "../JWT.mjs";
const app = express();
app.use(cookieParser());
const router = new express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/product", verifyToken, (req, res) => {
  console.log(req.userId);
  pool.query("select * from products", (err, result) => {
    res.send(result.rows);
  });
});

router.post("/add-product", async (req, res) => {
  try {
    const { title, description, price, file, catogory } = req.body;
    const newData = await pool.query(
      "INSERT INTO products (title,description,price,image,catogory) VALUES($1,$2,$3,$4,$5)",
      [title, description, price, file, catogory]
    );
    res.json(newData);
    // console.log(file);
  } catch (error) {
    console.log(error);
  }
});

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
